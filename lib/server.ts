import { env } from "cloudflare:workers";
import { getBinding } from "@/db";
import {
  DEMO_BUSINESS,
  validateBusiness,
  createRequest,
  changeRequest,
  createFeedback,
  text,
  uid,
  iso,
  type Business,
  type VisitRequest,
  type ReplyTranslation,
  startMinute,
} from "./workflow";
type Configuration = {
  NOOR_OWNER_ID?: string;
  NOOR_PRIVATE_OWNER_ONLY?: string;
  TWILIO_ACCOUNT_SID?: string;
  TWILIO_AUTH_TOKEN?: string;
  TWILIO_NUMBER?: string;
  NOOR_OPERATOR_PHONE?: string;
  NOOR_PUBLIC_ORIGIN?: string;
};
const config = () => env as unknown as Configuration;
const json = (data: unknown, status = 200) =>
  Response.json(data, {
    status,
    headers: {
      "Cache-Control": "no-store",
      "X-Content-Type-Options": "nosniff",
    },
  });
async function data(request: Request) {
  const size = Number(request.headers.get("content-length") ?? 0);
  if (size > 15000) throw new Error("Request is too large.");
  const value = await request.text();
  if (value.length > 15000) throw new Error("Request is too large.");
  return JSON.parse(value || "{}");
}
function owner(request: Request) {
  const c = config();
  // Only enable this fallback on a platform-enforced owner-private Site.
  // Public deployments must set the stable NOOR_OWNER_ID explicitly.
  if (!c.NOOR_OWNER_ID && c.NOOR_PRIVATE_OWNER_ONLY === "1" && request.headers.get("oai-authenticated-user-id")) return;
  if (
    !c.NOOR_OWNER_ID ||
    request.headers.get("oai-authenticated-user-id") !== c.NOOR_OWNER_ID
  )
    throw new Error("Operator access is required.");
}
function sameOrigin(request: Request) {
  const origin = request.headers.get("origin");
  if (origin && origin !== new URL(request.url).origin)
    throw new Error("Submit from this website.");
}
async function business(): Promise<Business> {
  const row = await getBinding()
    .prepare("SELECT body FROM business WHERE id = ?")
    .bind("main")
    .first<{ body: string }>();
  return row
    ? validateBusiness(JSON.parse(row.body))
    : structuredClone(DEMO_BUSINESS);
}
async function allRequests() {
  const rows = await getBinding()
    .prepare("SELECT body FROM requests ORDER BY rowid DESC LIMIT 1000")
    .all<{ body: string }>();
  return rows.results.map((r) => JSON.parse(r.body) as VisitRequest);
}
async function getRequest(id: string, token?: string) {
  if (token !== undefined && token.length < 20)
    throw new Error("A private request key is required.");
  const row = await getBinding()
    .prepare(
      token !== undefined
        ? "SELECT body FROM requests WHERE id = ? AND token = ?"
        : "SELECT body FROM requests WHERE id = ?",
    )
    .bind(...(token !== undefined ? [id, token] : [id]))
    .first<{ body: string }>();
  if (!row) throw new Error("Request not found.");
  return JSON.parse(row.body) as VisitRequest;
}
async function limit(request: Request) {
  const ip = request.headers.get("cf-connecting-ip") ?? "unknown";
  const window = Math.floor(Date.now() / 600000);
  const digest = await crypto.subtle.digest(
    "SHA-256",
    new TextEncoder().encode(`${ip}-${window}`),
  );
  const id = Array.from(new Uint8Array(digest))
    .map((v) => v.toString(16).padStart(2, "0"))
    .join("");
  const db = getBinding();
  await db
    .prepare(
      "INSERT INTO limits (id,count,expires) VALUES (?,1,?) ON CONFLICT(id) DO UPDATE SET count=count+1",
    )
    .bind(id, Date.now() + 1200000)
    .run();
  const row = await db
    .prepare("SELECT count FROM limits WHERE id = ?")
    .bind(id)
    .first<{ count: number }>();
  if ((row?.count ?? 0) > 20)
    throw new Error("Too many requests. Please wait before trying again.");
  await db
    .prepare("DELETE FROM limits WHERE expires < ?")
    .bind(Date.now())
    .run();
}
async function persistRequest(
  old: VisitRequest,
  next: VisitRequest,
  b: Business,
) {
  const db = getBinding();
  const extra =
    next.status === "confirmed"
      ? " AND ? + COALESCE((SELECT SUM(guests) FROM requests WHERE date = ? AND status = ? AND id <> ? AND (CAST(substr(time,1,2) AS INTEGER)*60+CAST(substr(time,4,2) AS INTEGER)) < ? AND (CAST(substr(time,1,2) AS INTEGER)*60+CAST(substr(time,4,2) AS INTEGER)+json_extract(body,'$.minutes')) > ?),0) <= ?"
      : "";
  const args: unknown[] = [
    JSON.stringify(next),
    next.status,
    next.revision,
    next.id,
    old.revision,
  ];
  if (next.status === "confirmed")
    args.push(
      next.guests,
      next.date,
      "confirmed",
      next.id,
      startMinute(next.time) + next.minutes,
      startMinute(next.time),
      b.capacity,
    );
  const result = await db
    .prepare(
      `UPDATE requests SET body = ?, status = ?, revision = ? WHERE id = ? AND revision = ?${extra}`,
    )
    .bind(...args)
    .run();
  if (result.meta.changes !== 1)
    throw new Error(
      "The request changed or the visiting time is full. Refresh before deciding.",
    );
  return next;
}
async function requestAction(
  id: string,
  revision: number,
  action: string,
  input: { reply?: string; total?: number; replyTranslation?: ReplyTranslation },
) {
  const b = await business(),
    old = await getRequest(id);
  if (old.revision !== revision)
    throw new Error("The request has changed. Refresh before deciding.");
  const next = changeRequest(old, action, b, await allRequests(), input);
  return persistRequest(old, next, b);
}
async function smsWebhook(request: Request) {
  const c = config();
  if (!c.TWILIO_AUTH_TOKEN || !c.NOOR_OPERATOR_PHONE || !c.NOOR_PUBLIC_ORIGIN)
    return json({ error: "Live SMS is not configured." }, 503);
  const f = await request.formData();
  const params = new Map<string, string[]>();
  for (const [key, value] of f.entries()) {
    if (typeof value !== "string")
      return json({ error: "Invalid message." }, 400);
    params.set(key, [...(params.get(key) ?? []), value]);
  }
  let signed = new URL("/api/noor/sms", c.NOOR_PUBLIC_ORIGIN).href;
  for (const key of [...params.keys()].sort())
    for (const value of [...params.get(key)!].sort()) signed += key + value;
  const key = await crypto.subtle.importKey(
    "raw",
    new TextEncoder().encode(c.TWILIO_AUTH_TOKEN),
    { name: "HMAC", hash: "SHA-1" },
    false,
    ["sign"],
  );
  const bytes = await crypto.subtle.sign(
    "HMAC",
    key,
    new TextEncoder().encode(signed),
  );
  const expected = btoa(String.fromCharCode(...new Uint8Array(bytes))),
    given = request.headers.get("x-twilio-signature") ?? "";
  let diff = expected.length ^ given.length;
  for (let i = 0; i < expected.length; i++)
    diff |= expected.charCodeAt(i) ^ (given.charCodeAt(i) || 0);
  if (diff || f.get("From") !== c.NOOR_OPERATOR_PHONE)
    return json({ error: "Message authentication failed." }, 403);
  const command = /^(APPROVE|DECLINE)\s+([A-Z0-9]{8})\s+(\d+)$/i.exec(
    String(f.get("Body") ?? "").trim(),
  );
  let reply = "Use APPROVE CODE REVISION or DECLINE CODE REVISION.";
  if (command) {
    try {
      const row = await getBinding()
        .prepare("SELECT id FROM requests WHERE code = ?")
        .bind(command[2].toUpperCase())
        .first<{ id: string }>();
      if (!row) throw new Error("Request not found.");
      const next = await requestAction(
        row.id,
        Number(command[3]),
        command[1].toUpperCase() === "APPROVE" ? "quote" : "decline",
        {},
      );
      reply =
        next.status === "quoted"
          ? "Quote approved. Visitor acceptance is still required."
          : "Request declined.";
    } catch (e) {
      reply = (e as Error).message;
    }
  }
  return new Response(
    `<Response><Message>${reply.replaceAll("&", "&amp;").replaceAll("<", "&lt;").replaceAll(">", "&gt;")}</Message></Response>`,
    { headers: { "Content-Type": "text/xml", "Cache-Control": "no-store" } },
  );
}
export async function handle(request: Request, path: string) {
  try {
    if (path === "sms" && request.method === "POST")
      return await smsWebhook(request);
    sameOrigin(request);
    const db = getBinding();
    if (request.method === "GET" && path === "business") {
      const f = await db
        .prepare(
          "SELECT body FROM feedback WHERE json_extract(body,'$.published') = 1 AND json_extract(body,'$.testimonialConsent') = 1 ORDER BY rowid DESC LIMIT 3",
        )
        .all<{ body: string }>();
      return json({
        business: await business(),
        testimonials: f.results.map((r) => {
          const f = JSON.parse(r.body);
          return {
            id: f.id,
            text: f.text,
            createdAt: f.createdAt,
            language: f.language,
            demo: f.demo,
            testimonialConsent: true,
            published: true,
          };
        }),
      });
    }
    if (request.method === "GET" && path === "owner") {
      owner(request);
      const [requests, feedback, subscribers] = await Promise.all([
        allRequests(),
        db
          .prepare("SELECT body FROM feedback ORDER BY rowid DESC LIMIT 1000")
          .all<{ body: string }>(),
        db
          .prepare(
            "SELECT body FROM subscribers ORDER BY rowid DESC LIMIT 2000",
          )
          .all<{ body: string }>(),
      ]);
      return json({
        requests,
        feedback: feedback.results.map((r) => JSON.parse(r.body)),
        subscribers: subscribers.results.map((r) => JSON.parse(r.body)),
        smsConfigured: !!(
          config().TWILIO_AUTH_TOKEN &&
          config().NOOR_OPERATOR_PHONE &&
          config().TWILIO_NUMBER
        ),
      });
    }
    if (request.method !== "POST") return json({ error: "Not found." }, 404);
    const x = await data(request);
    if (path === "owner/publish") {
      owner(request);
      const b = validateBusiness(x.business),
        old = await business();
      if (x.expectedRevision !== old.revision)
        return json(
          {
            error: "The website changed. Refresh and review the current facts.",
          },
          409,
        );
      if (
        !b.activities.some((a) => a.enabled) ||
        (!b.demo &&
          ((!b.phone && !b.email) ||
            !b.directions ||
            !b.introSw ||
            !b.directionsSw))
      )
        throw new Error(
          "Complete and review the business facts before publishing.",
        );
      const next = { ...b, revision: old.revision + 1, publishedAt: iso() };
      let result;
      if (old.revision === 0)
        result = await db
          .prepare(
            "INSERT INTO business (id,revision,body) VALUES (?,?,?) ON CONFLICT(id) DO UPDATE SET revision=excluded.revision,body=excluded.body WHERE business.revision = ?",
          )
          .bind("main", next.revision, JSON.stringify(next), old.revision)
          .run();
      else
        result = await db
          .prepare(
            "UPDATE business SET revision = ?,body = ? WHERE id = ? AND revision = ?",
          )
          .bind(next.revision, JSON.stringify(next), "main", old.revision)
          .run();
      if (result.meta.changes !== 1)
        return json(
          { error: "The website changed. Refresh before publishing." },
          409,
        );
      return json({ business: next });
    }
    if (path === "request") {
      await limit(request);
      const b = await business();
      if (!b.demo && !b.publishedAt)
        throw new Error("This experience is not ready for visits.");
      const r = { ...createRequest(x, b, b.demo), hosted: true };
      await db
        .prepare(
          "INSERT INTO requests (id,token,code,revision,status,date,time,guests,body) VALUES (?,?,?,?,?,?,?,?,?)",
        )
        .bind(
          r.id,
          r.token,
          r.code,
          r.revision,
          r.status,
          r.date,
          r.time,
          r.guests,
          JSON.stringify(r),
        )
        .run();
      return json({ request: r }, 201);
    }
    if (path === "status") {
      await limit(request);
      return json({
        request: visitorRequest(await getRequest(text(x.id, 60), text(x.token, 60))),
      });
    }
    if (path === "accept") {
      await limit(request);
      const old = await getRequest(text(x.id, 60), text(x.token, 60));
      if (old.revision !== x.revision)
        return json(
          {
            error:
              "The quote changed. Check the current quote before accepting.",
          },
          409,
        );
      return json({
        request: visitorRequest(await requestAction(old.id, old.revision, "accept", {})),
      });
    }
    if (path === "owner/testimonial") {
      owner(request);
      const row = await db
        .prepare("SELECT body FROM feedback WHERE id = ?")
        .bind(text(x.id, 60))
        .first<{ body: string }>();
      if (!row) throw new Error("Feedback not found.");
      const f = JSON.parse(row.body);
      if (!f.testimonialConsent)
        throw new Error("Publication permission is required.");
      await db
        .prepare("UPDATE feedback SET body = ? WHERE id = ? AND body = ?")
        .bind(
          JSON.stringify({ ...f, published: x.published === true }),
          f.id,
          row.body,
        )
        .run();
      return json({ saved: true });
    }
    if (path === "clarify") {
      await limit(request);
      const old = await getRequest(text(x.id, 60), text(x.token, 60));
      if (
        old.revision !== x.revision ||
        old.status !== "needs_details" ||
        !text(x.message)
      )
        throw new Error(
          "Check the current request and add the requested details.",
        );
      const next = {
        ...old,
        special: [old.special, text(x.message)]
          .filter(Boolean)
          .join("\n")
          .slice(0, 5000),
        status: "requested" as const,
        revision: old.revision + 1,
      };
      return json({
        request: visitorRequest(await persistRequest(old, next, await business())),
      });
    }
    if (path === "owner/request") {
      owner(request);
      if (
        ![
          "quote",
          "details",
          "answer",
          "decline",
          "cancel",
          "complete",
        ].includes(x.action)
      )
        throw new Error(
          "Choose an operator action. The visitor accepts their own quote.",
        );
      return json({
        request: await requestAction(
          text(x.id, 60),
          Number(x.revision),
          text(x.action, 30),
          {
            reply: text(x.reply),
            replyTranslation: x.replyTranslation as ReplyTranslation | undefined,
            total: x.total === undefined ? undefined : Number(x.total),
          },
        ),
      });
    }
    if (path === "feedback") {
      await limit(request);
      const r = await getRequest(text(x.requestId, 60), text(x.token, 60));
      if (r.kind !== "visit" || r.status !== "completed")
        throw new Error(
          "Feedback requires a completed visit and its private request key.",
        );
      const item = {
        ...createFeedback({ ...x, requestId: r.id }, r.demo),
        hosted: true,
      };
      const previous = await db
        .prepare("SELECT id FROM feedback WHERE request_id = ?")
        .bind(r.id)
        .first();
      if (previous)
        throw new Error("Feedback has already been received for this visit.");
      await db
        .prepare("INSERT INTO feedback (id,request_id,body) VALUES (?,?,?)")
        .bind(item.id, r.id, JSON.stringify(item))
        .run();
      return json({ feedback: item }, 201);
    }
    if (path === "subscribe") {
      await limit(request);
      const email = text(x.email, 150).toLowerCase();
      if (x.consent !== true || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email))
        throw new Error("Add an email and newsletter permission.");
      const b = await business(),
        subscriber = {
          id: uid(),
          email,
          consentAt: iso(),
          demo: b.demo,
          hosted: true,
        };
      await db
        .prepare(
          "INSERT INTO subscribers (id,email,token,body) VALUES (?,?,?,?) ON CONFLICT(email) DO NOTHING",
        )
        .bind(subscriber.id, email, uid(), JSON.stringify(subscriber))
        .run();
      return json({ subscriber });
    }
    if (path === "owner/delete") {
      owner(request);
      if (x.kind === "request") {
        await db.batch([
          db
            .prepare("DELETE FROM feedback WHERE request_id = ?")
            .bind(text(x.id, 60)),
          db.prepare("DELETE FROM requests WHERE id = ?").bind(text(x.id, 60)),
        ]);
      } else if (x.kind === "subscriber")
        await db
          .prepare("DELETE FROM subscribers WHERE id = ?")
          .bind(text(x.id, 60))
          .run();
      else throw new Error("Choose a supported record type.");
      return json({ deleted: true });
    }
    if (path === "owner/send-sms") {
      owner(request);
      const c = config();
      if (
        !c.TWILIO_ACCOUNT_SID ||
        !c.TWILIO_AUTH_TOKEN ||
        !c.TWILIO_NUMBER ||
        !c.NOOR_OPERATOR_PHONE
      )
        return json(
          { error: "Live SMS is not configured. No message was sent." },
          503,
        );
      const r = await getRequest(text(x.id, 60));
      if (
        r.revision !== x.revision ||
        !["requested", "needs_details"].includes(r.status)
      )
        throw new Error("Refresh the current open request.");
      const message = `Request ${r.code}: ${r.guests} visitors ${r.date} ${r.time}. Total ${r.total} ${r.currency}. Reply APPROVE ${r.code} ${r.revision} or DECLINE ${r.code} ${r.revision}. Approval creates a quote, not a confirmed booking.`;
      const response = await fetch(
        `https://api.twilio.com/2010-04-01/Accounts/${encodeURIComponent(c.TWILIO_ACCOUNT_SID)}/Messages.json`,
        {
          method: "POST",
          headers: {
            Authorization: `Basic ${btoa(`${c.TWILIO_ACCOUNT_SID}:${c.TWILIO_AUTH_TOKEN}`)}`,
            "Content-Type": "application/x-www-form-urlencoded",
          },
          body: new URLSearchParams({
            To: c.NOOR_OPERATOR_PHONE,
            From: c.TWILIO_NUMBER,
            Body: message,
          }),
        },
      );
      if (!response.ok)
        throw new Error(
          "SMS provider rejected the message. Check configuration.",
        );
      return json({ submitted: true, delivered: false });
    }
    return json({ error: "Not found." }, 404);
  } catch (e) {
    const message = (e as Error).message;
    const client =
      /required|permission|valid|Choose|Enter|Add |Check|quote|Quote|capacity|visiting time|fit within|request|Request|changed|Complete|completed|Feedback|already|Too many|Submit|ready|supported|Refresh|Unknown|Only|closed|translated reply/i.test(
        message,
      );
    return json(
      {
        error: client
          ? message
          : "The connected service is unavailable. Your local draft is unchanged.",
      },
      message === "Operator access is required." ? 403 : client ? 400 : 503,
    );
  }
}

function visitorRequest(r: VisitRequest) { const visible={...r};delete visible.replyTranslation;return visible; }
