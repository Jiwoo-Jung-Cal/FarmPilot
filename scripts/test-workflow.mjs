import assert from "node:assert/strict";
import { readFile, writeFile, mkdir } from "node:fs/promises";
import ts from "typescript";
const source = await readFile("lib/workflow.ts", "utf8");
const js = ts.transpileModule(source, {
  compilerOptions: {
    target: ts.ScriptTarget.ES2022,
    module: ts.ModuleKind.ES2022,
  },
}).outputText;
const w = await import(
  `data:text/javascript;base64,${Buffer.from(js).toString("base64")}`
);
const checks = [];
function check(name, run) {
  run();
  checks.push(name);
}
check("message-language validation accepts four languages and rejects inherited object keys", () => {
  for (const language of ["en", "sw", "fr", "es"]) assert.equal(w.isMessageLanguage(language), true);
  for (const language of ["__proto__", "constructor", "de", null]) assert.equal(w.isMessageLanguage(language), false);
  for (const language of ["fr", "es"]) {
    const r = w.createRequest({kind:"question", name:"Visitor", consent:true, language, question:"When can we visit?"}, w.DEMO_BUSINESS, true);
    assert.equal(r.language, language);
    const backup = w.initialTourism(); backup.requests=[r]; assert.equal(w.restoreTourism(backup).requests[0].language,language);
  }
  assert.throws(() => w.createRequest({kind:"question",name:"Visitor",consent:true,language:"de",question:"When?"},w.DEMO_BUSINESS,true));
});
const b = structuredClone(w.DEMO_BUSINESS),
  date = new Date(Date.now() + 3 * 86400000).toISOString().slice(0, 10);
const input = {
  kind: "visit",
  name: "Test visitor",
  channel: "website",
  date,
  time: "09:00",
  guests: 5,
  activityIds: ["walk", "tasting"],
  consent: true,
};
check("request estimates use approved per-person prices", () => {
  const r = w.createRequest(input, b, true);
  assert.equal(r.total, 4750);
  assert.equal(r.minutes, 70);
  assert.equal(r.status, "requested");
});
check(
  "no consent, invalid activity, invalid date and invalid guest count are rejected",
  () => {
    for (const changes of [
      { consent: false },
      { activityIds: ["invented"] },
      { guests: 9 },
      { date: "2026-02-30" },
    ])
      assert.throws(() => w.createRequest({ ...input, ...changes }, b, true));
  },
);
let r = w.createRequest(input, b, true);
check("request cannot confirm before an operator quote", () =>
  assert.throws(() => w.changeRequest(r, "accept", b, [r])),
);
r = w.changeRequest(r, "quote", b, [r], {
  total: 4500,
  reply: "Reviewed total for the group.",
});
check("operator quote awaits visitor acceptance and has expiry", () => {
  assert.equal(r.status, "quoted");
  assert.equal(r.total, 4500);
  assert(r.quoteExpiresAt);
  assert.equal(r.revision, 1);
});
check("expired quote cannot be accepted", () =>
  assert.throws(() =>
    w.changeRequest(
      { ...r, quoteExpiresAt: "2000-01-01T00:00:00Z" },
      "accept",
      b,
      [r],
    ),
  ),
);
const confirmed = w.changeRequest(r, "accept", b, [r]);
check("visitor acceptance confirms the quoted total", () => {
  assert.equal(confirmed.status, "confirmed");
  assert.equal(confirmed.total, 4500);
});
check("overlapping visits cannot exceed capacity", () => {
  const next = w.createRequest({ ...input, guests: 4 }, b, true);
  assert.throws(() => w.changeRequest(next, "quote", b, [confirmed, next]));
  const later = w.createRequest(
    { ...input, time: "11:00", guests: 4 },
    b,
    true,
  );
  assert.equal(
    w.changeRequest(later, "quote", b, [confirmed, later]).status,
    "quoted",
  );
  const overlap = { ...confirmed, time: "09:30" };
  assert.equal(w.reserved([overlap], date, "09:00", "", 70), 5);
});
check("confirmation rechecks capacity when another quote was accepted", () => {
  const second = w.createRequest({ ...input, guests: 5 }, b, true),
    quoted = w.changeRequest(second, "quote", b, [second]);
  assert.throws(() =>
    w.changeRequest(quoted, "accept", b, [confirmed, quoted]),
  );
});
check("closed decisions cannot be replayed", () => {
  const declined = w.changeRequest(
    w.createRequest(input, b, true),
    "decline",
    b,
    [],
  );
  assert.throws(() => w.changeRequest(declined, "quote", b, []));
  assert.throws(() => w.changeRequest(confirmed, "quote", b, [confirmed]));
});
check("feedback permissions are separate and identifiers are scrubbed", () => {
  assert.throws(() => w.createFeedback({ memorable: "Lovely" }, true));
  const f = w.createFeedback(
    {
      memorable: "Loved it. Email name@example.com.",
      analysisConsent: true,
      testimonialConsent: false,
    },
    true,
  );
  assert(!f.text.includes("name@example.com"));
  assert.equal(f.testimonialConsent, false);
  assert.equal(f.marketingConsent, false);
});
check("business validation rejects negative prices and malformed times", () => {
  assert.throws(() =>
    w.validateBusiness({
      ...b,
      activities: [{ ...b.activities[0], price: -1 }],
    }),
  );
  assert.throws(() => w.validateBusiness({ ...b, startTimes: ["25:00"] }));
});
check(
  "backup validation preserves approved state and rejects duplicate requests",
  () => {
    const s = w.initialTourism();
    assert.equal(w.restoreTourism(s).version, 2);
    assert.throws(() =>
      w.restoreTourism({ ...s, requests: [s.requests[0], s.requests[0]] }),
    );
  },
);
check("malformed backup records fail without accepting partial data", () => {
  const s = w.initialTourism();
  assert.throws(() =>
    w.restoreTourism({
      ...s,
      requests: [{ ...s.requests[0], currency: "invalid" }],
    }),
  );
  assert.throws(() =>
    w.restoreTourism({
      ...s,
      feedback: [{ id: "partial", text: "Text", analysisConsent: true }],
    }),
  );
  assert.throws(() => w.restoreTourism({ ...s, subscribers: [null] }));
  const f = w.createFeedback(
    { memorable: "Useful visit.", analysisConsent: true },
    true,
  );
  assert.equal(
    w.restoreTourism({ ...s, feedback: [f] }).feedback[0].text,
    "Useful visit.",
  );
});
check("listing export uses explicit business data and demo disclosure", () => {
  const listing = w.listingText(b, "en");
  assert(listing.includes("DEMONSTRATION ONLY"));
  assert(listing.includes("Coffee tasting"));
  assert(!listing.includes("free lunch"));
});
await mkdir("docs", { recursive: true });
await writeFile(
  "docs/workflow-validation.json",
  JSON.stringify(
    {
      version: "2.0.0",
      passed: checks.length,
      checks,
      environment: "Node state-machine tests; not field validation",
      date: new Date().toISOString(),
    },
    null,
    2,
  ),
);
console.log(JSON.stringify({ passed: checks.length, checks }));
