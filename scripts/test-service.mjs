import assert from "node:assert/strict";
import { DatabaseSync } from "node:sqlite";
import { readFile, writeFile, mkdir } from "node:fs/promises";
import ts from "typescript";
await mkdir(".checks", { recursive: true });
const compile = (source) =>
  ts.transpileModule(source, {
    compilerOptions: {
      target: ts.ScriptTarget.ES2022,
      module: ts.ModuleKind.ES2022,
    },
  }).outputText;
await writeFile(
  ".checks/workflow.mjs",
  compile(await readFile("lib/workflow.ts", "utf8")),
);
const server = (await readFile("lib/server.ts", "utf8"))
  .replace(/(["'])cloudflare:workers\1/g, "'./testenv.mjs'")
  .replace(/(["'])@\/db\1/g, "'./testenv.mjs'")
  .replace(/(["'])\.\/workflow\1/g, "'./workflow.mjs'");
await writeFile(".checks/server.mjs", compile(server));
await writeFile(
  ".checks/testenv.mjs",
  "export const env=globalThis.testEnvironment; export const getBinding=()=>globalThis.testBinding;",
);
const sqlite = new DatabaseSync(":memory:");
const sql = await readFile("drizzle/0000_normal_paladin.sql", "utf8");
for (const part of sql.split("--> statement-breakpoint"))
  if (part.trim()) sqlite.exec(part);
globalThis.testEnvironment = { NOOR_OWNER_ID: "test-owner" };
class Prepared {
  constructor(sql, args = []) {
    this.sql = sql;
    this.args = args;
  }
  bind(...args) {
    return new Prepared(this.sql, args);
  }
  async first() {
    return sqlite.prepare(this.sql).get(...this.args) ?? null;
  }
  async all() {
    return { results: sqlite.prepare(this.sql).all(...this.args) };
  }
  async run() {
    const result = sqlite.prepare(this.sql).run(...this.args);
    return { meta: { changes: Number(result.changes) } };
  }
}
globalThis.testBinding = {
  prepare: (sql) => new Prepared(sql),
  batch: async (steps) => {
    sqlite.exec("BEGIN");
    try {
      const out = [];
      for (const step of steps) out.push(await step.run());
      sqlite.exec("COMMIT");
      return out;
    } catch (e) {
      sqlite.exec("ROLLBACK");
      throw e;
    }
  },
};
const { handle } = await import("../.checks/server.mjs");
const checks = [];
async function call(path, body, owner = false, headers = {}) {
  const request = new Request(`https://example.test/api/noor/${path}`, {
    method: body ? "POST" : "GET",
    headers: {
      ...(body
        ? { "content-type": "application/json", origin: "https://example.test" }
        : {}),
      ...(owner ? { "oai-authenticated-user-id": "test-owner" } : {}),
      ...headers,
    },
    body: body ? JSON.stringify(body) : undefined,
  });
  const response = await handle(request, path);
  return { status: response.status, ...(await response.json()) };
}
async function check(name, run) {
  await run();
  checks.push(name);
}
await check("owner records and actions require operator identity", async () => {
  assert.equal((await call("owner")).status, 403);
  assert.equal(
    (
      await call("owner/request", {
        id: "unknown",
        revision: 0,
        action: "quote",
      })
    ).status,
    403,
  );
});
await check("public business contains no private request data", async () => {
  const r = await call("business");
  assert.equal(r.status, 200);
  assert.equal(r.business.demo, true);
  assert(!("requests" in r));
  assert(!("subscribers" in r));
});
const date = new Date(Date.now() + 3 * 86400000).toISOString().slice(0, 10),
  input = {
    kind: "visit",
    name: "Synthetic service tester",
    channel: "website",
    date,
    time: "09:00",
    guests: 5,
    activityIds: ["walk", "tasting"],
    consent: true,
  };
let a, b;
await check(
  "public submissions persist as requests with private status keys",
  async () => {
    const r = await call("request", input);
    assert.equal(r.status, 201);
    a = r.request;
    const t = await call("request", input);
    assert.equal(t.status, 201);
    b = t.request;
    assert.equal((await call("owner", undefined, true)).requests.length, 2);
    assert.equal(a.status, "requested");
  },
);
await check("wrong private status key cannot expose request", async () =>
  assert.equal(
    (await call("status", { id: a.id, token: "wrong" })).status,
    400,
  ),
);
await check(
  "omitting a private key cannot expose or change a request",
  async () => {
    for (const path of ["status", "accept", "clarify"])
      assert.equal(
        (
          await call(path, {
            id: a.id,
            revision: a.revision,
            message: "More details",
          })
        ).status,
        400,
      );
  },
);
await check("visitor cannot accept an unapproved request", async () =>
  assert.equal(
    (await call("accept", { id: a.id, token: a.token, revision: a.revision }))
      .status,
    400,
  ),
);
await check(
  "operator quotes persist without prematurely confirming",
  async () => {
    const r = await call(
      "owner/request",
      {
        id: a.id,
        revision: 0,
        action: "quote",
        total: 4000,
        reply: "Reviewed synthetic quote.",
        replyTranslation: { original:"Jibu la mfano.", source:"sw", target:"en", text:"Reviewed synthetic quote.", models:["Synthetic test fixture"], reviewedAt:new Date().toISOString() },
      },
      true,
    );
    assert.equal(r.status, 200);
    a = r.request;
    assert.equal(a.status, "quoted");
    const t = await call(
      "owner/request",
      { id: b.id, revision: 0, action: "quote", total: 4500 },
      true,
    );
    assert.equal(t.status, 200);
    b = t.request;
  },
);
await check("translation originals stay in owner records and are excluded from visitor status", async () => {
  const ownerState=await call("owner",undefined,true);
  assert.equal(ownerState.requests.find(r=>r.id===a.id).replyTranslation.original,"Jibu la mfano.");
  const visible=await call("status",{id:a.id,token:a.token});
  assert.equal(visible.status,200);assert.equal(visible.request.reply,"Reviewed synthetic quote.");assert.equal(visible.request.replyTranslation,undefined);
  const invalid=await call("owner/request",{id:a.id,revision:a.revision,action:"quote",reply:"Changed reply",replyTranslation:{...a.replyTranslation,text:"A different draft"}},true);
  assert.equal(invalid.status,400);
});
await check("operator endpoint cannot bypass visitor acceptance", async () =>
  assert.equal(
    (
      await call(
        "owner/request",
        { id: a.id, revision: a.revision, action: "accept" },
        true,
      )
    ).status,
    400,
  ),
);
await check("visitor clarification keeps translation audit private", async () => {
  const created=await call("request",{...input,name:"Clarification privacy fixture",language:"fr",guests:1});
  const r=created.request;
  const updated=await call("owner/request",{id:r.id,revision:0,action:"details",reply:"Merci de préciser.",replyTranslation:{original:"Please clarify.",source:"en",target:"fr",text:"Merci de préciser.",models:["Synthetic test fixture"],reviewedAt:new Date().toISOString()}},true);
  assert.equal(updated.status,200);
  const clarified=await call("clarify",{id:r.id,token:r.token,revision:updated.request.revision,message:"Synthetic extra details."});
  assert.equal(clarified.status,200);
  assert.equal(clarified.request.replyTranslation,undefined);
  assert.equal((await call("owner",undefined,true)).requests.find(x=>x.id===r.id).replyTranslation.original,"Please clarify.");
});
await check("concurrent acceptances cannot exceed slot capacity", async () => {
  const results = await Promise.all([
    call("accept", { id: a.id, token: a.token, revision: a.revision }),
    call("accept", { id: b.id, token: b.token, revision: b.revision }),
  ]);
  assert.equal(
    results.filter((r) => r.status === 200).length,
    1,
    JSON.stringify(results.map((r) => ({ status: r.status, error: r.error }))),
  );
  assert.equal(
    results.filter((r) => r.status === 400).length,
    1,
    JSON.stringify(results.map((r) => ({ status: r.status, error: r.error }))),
  );
  const records = (await call("owner", undefined, true)).requests;
  assert.equal(
    records
      .filter((r) => r.status === "confirmed")
      .reduce((n, r) => n + r.guests, 0),
    5,
  );
  a = records.find((r) => r.status === "confirmed");
});
await check("stale revisions cannot replay approval", async () =>
  assert.equal(
    (
      await call(
        "owner/request",
        { id: a.id, revision: 0, action: "quote" },
        true,
      )
    ).status,
    400,
  ),
);
await check("feedback requires a completed visit", async () => {
  const r = await call("feedback", {
    requestId: a.id,
    token: a.token,
    memorable: "Enjoyed grinding coffee.",
    analysisConsent: true,
  });
  assert.equal(r.status, 400);
  const completed = await call(
    "owner/request",
    { id: a.id, revision: a.revision, action: "complete" },
    true,
  );
  assert.equal(completed.status, 200);
  a = completed.request;
});
let feedback;
await check(
  "consented feedback is persisted and identifiers scrubbed",
  async () => {
    const r = await call("feedback", {
      requestId: a.id,
      token: a.token,
      memorable: "Enjoyed grinding coffee. visitor@example.com",
      change: "More practical time would help.",
      analysisConsent: true,
      testimonialConsent: true,
      language: "en",
    });
    assert.equal(r.status, 201);
    feedback = r.feedback;
    assert(!feedback.text.includes("visitor@example.com"));
    assert.equal(feedback.published, undefined);
    assert.equal((await call("business")).testimonials.length, 0);
  },
);
await check("a completed visit cannot submit duplicate feedback", async () =>
  assert.equal(
    (
      await call("feedback", {
        requestId: a.id,
        token: a.token,
        memorable: "Again",
        analysisConsent: true,
      })
    ).status,
    400,
  ),
);
await check(
  "public testimonial requires both permission and owner approval",
  async () => {
    assert.equal(
      (await call("owner/testimonial", { id: feedback.id, published: true }))
        .status,
      403,
    );
    assert.equal(
      (
        await call(
          "owner/testimonial",
          { id: feedback.id, published: true },
          true,
        )
      ).status,
      200,
    );
    const pub = await call("business");
    assert.equal(pub.testimonials.length, 1);
    assert(!("requestId" in pub.testimonials[0]));
    assert(!("source" in pub.testimonials[0]));
  },
);
await check("business publication uses revision comparison", async () => {
  const r = await call("business");
  const saved = await call(
    "owner/publish",
    {
      business: { ...r.business, name: "Approved synthetic business" },
      expectedRevision: 0,
    },
    true,
  );
  assert.equal(saved.status, 200);
  assert.equal(saved.business.revision, 1);
  assert.equal(
    (
      await call(
        "owner/publish",
        { business: r.business, expectedRevision: 0 },
        true,
      )
    ).status,
    409,
  );
});
await check("SMS fails closed when provider is unconfigured", async () =>
  assert.equal(
    (await call("owner/send-sms", { id: b.id, revision: b.revision }, true))
      .status,
    503,
  ),
);
await check(
  "newsletter requires explicit opt-in and deduplicates email",
  async () => {
    assert.equal(
      (
        await call("subscribe", {
          email: "synthetic@example.com",
          consent: false,
        })
      ).status,
      400,
    );
    assert.equal(
      (
        await call("subscribe", {
          email: "synthetic@example.com",
          consent: true,
        })
      ).status,
      200,
    );
    assert.equal(
      (
        await call("subscribe", {
          email: "synthetic@example.com",
          consent: true,
        })
      ).status,
      200,
    );
    assert.equal((await call("owner", undefined, true)).subscribers.length, 1);
  },
);
await check("cross-origin mutations are rejected", async () =>
  assert.equal(
    (await call("request", input, false, { origin: "https://other.test" }))
      .status,
    400,
  ),
);
await check(
  "server deletion removes request and connected feedback",
  async () => {
    assert.equal(
      (await call("owner/delete", { kind: "request", id: a.id }, true)).status,
      200,
    );
    assert.equal(
      (await call("status", { id: a.id, token: a.token })).status,
      400,
    );
    assert.equal((await call("business")).testimonials.length, 0);
  },
);
await writeFile(
  "docs/service-validation.json",
  JSON.stringify(
    {
      version: "3.0.2",
      passed: checks.length,
      checks,
      environment:
        "Actual handler and generated migrations with in-memory SQLite D1 adapter; synthetic inputs; no live SMS or field evaluation",
      date: new Date().toISOString(),
    },
    null,
    2,
  ),
);
sqlite.close();
console.log(JSON.stringify({ passed: checks.length, checks }));
