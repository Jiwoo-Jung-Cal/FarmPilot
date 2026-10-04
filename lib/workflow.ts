export const MESSAGE_LANGUAGES = { en: "English", sw: "Kiswahili", fr: "Français", es: "Español" } as const;
export type MessageLanguage = keyof typeof MESSAGE_LANGUAGES;
export function isMessageLanguage(value: unknown): value is MessageLanguage {
  return typeof value === "string" && Object.hasOwn(MESSAGE_LANGUAGES, value);
}
export type Language = "en" | "sw";
export type Activity = {
  id: string;
  name: string;
  nameSw: string;
  minutes: number;
  price: number;
  enabled: boolean;
};
export type Business = {
  revision: number;
  name: string;
  intro: string;
  introSw: string;
  country: string;
  location: string;
  directions: string;
  directionsSw: string;
  accessibility: string;
  accessibilitySw: string;
  phone: string;
  email: string;
  currency: string;
  capacity: number;
  days: number[];
  startTimes: string[];
  languages: string[];
  activities: Activity[];
  publishedAt: string | null;
  demo: boolean;
};
export type Status =
  | "requested"
  | "needs_details"
  | "quoted"
  | "confirmed"
  | "declined"
  | "cancelled"
  | "expired"
  | "completed";
export type VisitRequest = {
  id: string;
  token: string;
  code: string;
  revision: number;
  kind: "visit" | "question";
  name: string;
  contact: string;
  channel: "email" | "sms" | "website";
  language: MessageLanguage;
  question: string;
  date: string;
  time: string;
  guests: number;
  activityIds: string[];
  special: string;
  source: string;
  status: Status;
  total: number;
  currency: string;
  minutes: number;
  reply: string;
  replyTranslation?: ReplyTranslation;
  createdAt: string;
  quoteExpiresAt: string | null;
  consent: boolean;
  demo: boolean;
  feedbackSubmitted?: boolean;
  hosted?: boolean;
};
export type ReplyTranslation = { original: string; source: MessageLanguage; target: MessageLanguage; text: string; models: string[]; reviewedAt: string };
export function validateReplyTranslation(value: unknown, reply: string, language: MessageLanguage): ReplyTranslation {
  const v = value as ReplyTranslation;
  if (!v || typeof v.original !== "string" || !v.original.trim() || v.original.length > 1000 || !isMessageLanguage(v.source) || !isMessageLanguage(v.target) || v.target !== language || v.text !== reply || !Array.isArray(v.models) || v.models.length > 2 || v.models.some(m => typeof m !== "string" || m.length > 150) || typeof v.reviewedAt !== "string" || !Number.isFinite(Date.parse(v.reviewedAt))) throw new Error("Review the translated reply again before saving.");
  return { original:v.original, source:v.source, target:v.target, text:v.text, models:v.models, reviewedAt:v.reviewedAt };
}
export type FeedbackSubmission = {
  id: string;
  requestId: string | null;
  text: string;
  memorable: string;
  change: string;
  source: string;
  recommend: "yes" | "maybe" | "no";
  language: Language;
  analysisConsent: boolean;
  testimonialConsent: boolean;
  marketingConsent: boolean;
  createdAt: string;
  demo: boolean;
  published?: boolean;
  imported?: boolean;
  hosted?: boolean;
};
export type Subscriber = {
  hosted?: boolean;
  id: string;
  email: string;
  consentAt: string;
  demo: boolean;
};
export type Audit = {
  id: string;
  at: string;
  action: string;
  recordId: string;
  detail: string;
};
export type TourismState = {
  version: 2;
  language: Language;
  business: Business;
  draft: Business;
  requests: VisitRequest[];
  feedback: FeedbackSubmission[];
  subscribers: Subscriber[];
  audit: Audit[];
  reviewStep: number;
  lastSync: string | null;
  mode: "demo" | "own";
};
export const uid = () => globalThis.crypto.randomUUID();
export const iso = () => new Date().toISOString();
export const text = (value: unknown, max = 2000) =>
  typeof value === "string" ? value.trim().slice(0, max) : "";
export function redact(value: string) {
  return value
    .replace(/[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}/gi, "[email removed]")
    .replace(/(?:\+?\d[\d\s().-]{7,}\d)/g, "[phone removed]");
}
export const DEMO_BUSINESS: Business = {
  revision: 0,
  name: "Ondera Coffee Farm",
  intro:
    "Walk the coffee slopes, hear the story behind the harvest, and share a freshly prepared cup. Choose a small-group visit built around the activities you enjoy.",
  introSw:
    "Tembea shambani, sikiliza hadithi ya mavuno na uonje kahawa. Chagua shughuli unazopenda kwa ziara ya kikundi kidogo.",
  country: "Demonstration location",
  location: "Ondera highlands · fictional location",
  directions:
    "Demonstration only. An actual meeting point, transport information and landmark directions must be approved before accepting real visits.",
  directionsSw:
    "Mfano tu. Mahali pa kukutana na maelekezo halisi lazima yaidhinishwe kabla ya kupokea wageni.",
  accessibility:
    "Sloped farm paths. Access arrangements and facilities need operator confirmation.",
  accessibilitySw:
    "Njia za shamba zina mteremko. Thibitisha mahitaji ya ufikivu na mwenye shamba.",
  phone: "",
  email: "",
  currency: "KES",
  capacity: 8,
  days: [0, 1, 2, 3, 4, 5, 6],
  startTimes: ["09:00", "11:00", "14:00"],
  languages: ["English", "Kiswahili"],
  activities: [
    {
      id: "walk",
      name: "Coffee farm walk",
      nameSw: "Matembezi shambani",
      minutes: 45,
      price: 600,
      enabled: true,
    },
    {
      id: "story",
      name: "From berry to cup",
      nameSw: "Kutoka tunda hadi kikombe",
      minutes: 20,
      price: 250,
      enabled: true,
    },
    {
      id: "tasting",
      name: "Coffee tasting",
      nameSw: "Kuonja kahawa",
      minutes: 25,
      price: 350,
      enabled: true,
    },
  ],
  publishedAt: null,
  demo: true,
};
export const money = (n: number, currency: string) =>
  new Intl.NumberFormat("en", {
    style: "currency",
    currency,
    maximumFractionDigits: 0,
  }).format(n);
export function validateBusiness(input: unknown): Business {
  if (!input || typeof input !== "object")
    throw new Error("Invalid experience details.");
  const b = input as Business;
  if (
    !text(b.name, 100) ||
    !Array.isArray(b.activities) ||
    b.activities.length > 20
  )
    throw new Error("Add a business name and up to 20 activities.");
  if (!Number.isInteger(b.capacity) || b.capacity < 1 || b.capacity > 100)
    throw new Error("Capacity must be between 1 and 100.");
  if (
    !/^[A-Z]{3}$/.test(b.currency) ||
    !Array.isArray(b.days) ||
    !b.days.length ||
    b.days.some((d) => !Number.isInteger(d) || d < 0 || d > 6)
  )
    throw new Error("Check the currency and visiting days.");
  try {
    money(0, b.currency);
  } catch {
    throw new Error("Choose a valid currency.");
  }
  if (
    !Array.isArray(b.startTimes) ||
    !b.startTimes.length ||
    b.startTimes.length > 12 ||
    b.startTimes.some((t) => !/^([01]\d|2[0-3]):[0-5]\d$/.test(t))
  )
    throw new Error("Add valid visiting times.");
  const ids = new Set<string>();
  const activities = b.activities.map((a) => {
    if (
      !a ||
      !/^[-\w]{1,60}$/.test(a.id) ||
      ids.has(a.id) ||
      !text(a.name, 100) ||
      !Number.isInteger(a.minutes) ||
      a.minutes < 5 ||
      a.minutes > 480 ||
      !Number.isInteger(a.price) ||
      a.price < 0 ||
      a.price > 1000000
    )
      throw new Error(
        "Check each activity name, duration and whole-unit price.",
      );
    ids.add(a.id);
    return {
      id: a.id,
      name: text(a.name, 100),
      nameSw: text(a.nameSw, 100),
      minutes: a.minutes,
      price: a.price,
      enabled: a.enabled === true,
    };
  });
  return {
    ...b,
    revision: Number.isInteger(b.revision) && b.revision >= 0 ? b.revision : 0,
    name: text(b.name, 100),
    intro: text(b.intro),
    introSw: text(b.introSw),
    country: text(b.country, 100),
    location: text(b.location, 300),
    directions: text(b.directions),
    directionsSw: text(b.directionsSw),
    accessibility: text(b.accessibility),
    accessibilitySw: text(b.accessibilitySw),
    phone: text(b.phone, 40),
    email: text(b.email, 150),
    languages: Array.isArray(b.languages)
      ? b.languages
          .map((l) => text(l, 40))
          .filter(Boolean)
          .slice(0, 10)
      : ["English"],
    activities,
    days: [...new Set(b.days)],
    startTimes: [...new Set(b.startTimes)],
    publishedAt: typeof b.publishedAt === "string" ? b.publishedAt : null,
    demo: b.demo === true,
  };
}
export function calculate(b: Business, ids: string[], guests: number) {
  if (!Number.isInteger(guests) || guests < 1 || guests > b.capacity)
    throw new Error(`Choose 1–${b.capacity} visitors.`);
  const selected = b.activities.filter((a) => a.enabled && ids.includes(a.id));
  if (
    !selected.length ||
    new Set(ids).size !== ids.length ||
    selected.length !== ids.length
  )
    throw new Error("Choose available activities.");
  return {
    total: selected.reduce((n, a) => n + a.price, 0) * guests,
    minutes: selected.reduce((n, a) => n + a.minutes, 0),
    selected,
  };
}
export function validSlot(b: Business, date: string, time: string) {
  if (!/^\d{4}-\d{2}-\d{2}$/.test(date)) throw new Error("Choose a date.");
  const d = new Date(`${date}T12:00:00Z`);
  if (
    !Number.isFinite(d.getTime()) ||
    d.toISOString().slice(0, 10) !== date ||
    date < new Date().toISOString().slice(0, 10)
  )
    throw new Error("Choose a current or future date.");
  if (!b.days.includes(d.getUTCDay()) || !b.startTimes.includes(time))
    throw new Error("Choose an available visiting day and time.");
}
export function createRequest(
  input: unknown,
  b: Business,
  demo: boolean,
): VisitRequest {
  const x = (input ?? {}) as Record<string, unknown>;
  if (x.language !== undefined && !isMessageLanguage(x.language)) throw new Error("Choose a supported message language.");
  const kind = x.kind === "question" ? "question" : "visit";
  const channel =
    x.channel === "sms" ? "sms" : x.channel === "email" ? "email" : "website";
  const name = text(x.name, 100),
    contact = text(x.contact, 150),
    question = text(x.question),
    date = text(x.date, 10),
    time = text(x.time, 5),
    guests = Number(x.guests),
    activityIds = Array.isArray(x.activityIds)
      ? x.activityIds.map((a) => text(a, 60))
      : [];
  if (!name || x.consent !== true)
    throw new Error(
      "Add a name and permission to use your details for this request.",
    );
  if (channel === "email" && !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(contact))
    throw new Error("Enter a valid email address.");
  if (channel === "sms" && !/^\+?[\d ()-]{7,30}$/.test(contact))
    throw new Error("Enter a valid phone number.");
  if (kind === "question" && !question) throw new Error("Enter your question.");
  let pricing = { total: 0, minutes: 0 };
  if (kind === "visit") {
    validSlot(b, date, time);
    pricing = calculate(b, activityIds, guests);
  }
  const id = uid(),
    token = uid();
  return {
    id,
    token,
    code: id.replaceAll("-", "").slice(0, 8).toUpperCase(),
    revision: 0,
    kind,
    name,
    contact,
    channel,
    language: isMessageLanguage(x.language) ? x.language : "en",
    question,
    date: kind === "visit" ? date : "",
    time: kind === "visit" ? time : "",
    guests: kind === "visit" ? guests : 0,
    activityIds: kind === "visit" ? activityIds : [],
    special: text(x.special),
    source: text(x.source, 80) || "Website",
    status: "requested",
    ...pricing,
    currency: b.currency,
    reply: "",
    createdAt: iso(),
    quoteExpiresAt: null,
    consent: true,
    demo,
  };
}
export const startMinute = (time: string) =>
  Number(time.slice(0, 2)) * 60 + Number(time.slice(3, 5));
export function reserved(
  requests: VisitRequest[],
  date: string,
  time: string,
  exclude = "",
  minutes = 1,
) {
  const start = startMinute(time),
    end = start + minutes;
  return requests
    .filter(
      (r) =>
        r.id !== exclude &&
        r.date === date &&
        r.status === "confirmed" &&
        startMinute(r.time) < end &&
        startMinute(r.time) + r.minutes > start,
    )
    .reduce((n, r) => n + r.guests, 0);
}
export function changeRequest(
  r: VisitRequest,
  action: string,
  b: Business,
  all: VisitRequest[],
  input: { reply?: string; total?: number; replyTranslation?: ReplyTranslation } = {},
): VisitRequest {
  let next = { ...r, revision: r.revision + 1 };
  if (["quote", "answer", "details", "decline", "cancel"].includes(action)) {
    delete next.replyTranslation;
    if (input.replyTranslation) next.replyTranslation = validateReplyTranslation(input.replyTranslation, text(input.reply), r.language);
  }
  const terminal = ["declined", "cancelled", "expired", "completed"];
  if (terminal.includes(r.status)) throw new Error("This request is closed.");
  if (action === "quote") {
    if (
      r.kind !== "visit" ||
      !["requested", "needs_details", "quoted"].includes(r.status)
    )
      throw new Error("Only an open visit request can be quoted.");
    validSlot(b, r.date, r.time);
    const priced = calculate(b, r.activityIds, r.guests);
    next.minutes = priced.minutes;
    if (startMinute(r.time) + priced.minutes > 1440)
      throw new Error("These activities do not fit within the visiting day.");
    if (
      reserved(all, r.date, r.time, r.id, priced.minutes) + r.guests >
      b.capacity
    )
      throw new Error("This visiting time has insufficient capacity.");
    const total = input.total ?? r.total;
    if (!Number.isInteger(total) || total < 0 || total > 100000000)
      throw new Error("Enter a valid whole-unit total.");
    next = {
      ...next,
      status: "quoted",
      total,
      reply:
        text(input.reply) ||
        "Your visit request and total have been approved. Please accept this quote to confirm.",
      quoteExpiresAt: new Date(Date.now() + 48 * 3600000).toISOString(),
    };
  } else if (action === "accept") {
    if (
      r.status !== "quoted" ||
      !r.quoteExpiresAt ||
      Date.parse(r.quoteExpiresAt) < Date.now()
    )
      throw new Error(
        "This quote is unavailable or expired. Request a new quote.",
      );
    validSlot(b, r.date, r.time);
    if (reserved(all, r.date, r.time, r.id, r.minutes) + r.guests > b.capacity)
      throw new Error(
        "This visiting time is now full. Contact the operator for another time.",
      );
    next.status = "confirmed";
  } else if (action === "details") {
    if (
      !["requested", "needs_details", "quoted"].includes(r.status) ||
      !text(input.reply)
    )
      throw new Error("Add the information you need from the visitor.");
    next = {
      ...next,
      status: "needs_details",
      reply: text(input.reply),
      quoteExpiresAt: null,
    };
  } else if (action === "answer") {
    if (r.kind !== "question" || !text(input.reply))
      throw new Error("Add an approved answer.");
    next = { ...next, status: "completed", reply: text(input.reply) };
  } else if (action === "decline") {
    if (r.status === "confirmed")
      throw new Error("Use Cancel for a confirmed visit.");
    next = {
      ...next,
      status: "declined",
      reply:
        text(input.reply) || "The operator cannot accommodate this request.",
    };
  } else if (action === "cancel") {
    if (r.status !== "confirmed" && r.status !== "quoted")
      throw new Error("Only an agreed visit or quote can be cancelled.");
    next = {
      ...next,
      status: "cancelled",
      reply: text(input.reply) || "The visit has been cancelled.",
    };
  } else if (action === "complete") {
    if (r.status !== "confirmed")
      throw new Error("Only a confirmed visit can be completed.");
    next.status = "completed";
  } else throw new Error("Unknown request action.");
  return next;
}
export function createFeedback(
  input: unknown,
  demo: boolean,
): FeedbackSubmission {
  const x = (input ?? {}) as Record<string, unknown>;
  const memorable = redact(text(x.memorable)),
    change = redact(text(x.change));
  if (x.analysisConsent !== true || (!memorable && !change))
    throw new Error("Add feedback and permission for analysis.");
  return {
    id: uid(),
    requestId: typeof x.requestId === "string" ? x.requestId : null,
    text: [memorable, change].filter(Boolean).join("\n"),
    memorable,
    change,
    source: text(x.source, 80) || "Visitor form",
    recommend:
      x.recommend === "no" ? "no" : x.recommend === "maybe" ? "maybe" : "yes",
    language: x.language === "sw" ? "sw" : "en",
    analysisConsent: true,
    testimonialConsent: x.testimonialConsent === true,
    marketingConsent: x.marketingConsent === true,
    createdAt: iso(),
    demo,
  };
}
export function log(
  s: TourismState,
  action: string,
  recordId: string,
  detail: string,
) {
  return [
    { id: uid(), at: iso(), action, recordId, detail: text(detail, 500) },
    ...s.audit,
  ].slice(0, 500);
}
export function initialTourism(): TourismState {
  const business = structuredClone(DEMO_BUSINESS);
  const date = new Date(Date.now() + 86400000 * 3).toISOString().slice(0, 10);
  const seed = createRequest(
    {
      name: "Example visitor",
      kind: "visit",
      channel: "website",
      date,
      time: "09:00",
      guests: 2,
      activityIds: ["walk", "tasting"],
      special: "Could we try grinding the coffee ourselves?",
      consent: true,
      source: "Local guesthouse",
    },
    business,
    true,
  );
  return {
    version: 2,
    language: "en",
    business,
    draft: structuredClone(business),
    requests: [seed],
    feedback: [],
    subscribers: [],
    audit: [],
    reviewStep: 0,
    lastSync: null,
    mode: "demo",
  };
}
export function restoreTourism(value: unknown): TourismState {
  if (!value || typeof value !== "object")
    throw new Error("Invalid workspace backup.");
  const s = value as TourismState;
  if (
    s.version !== 2 ||
    !Array.isArray(s.requests) ||
    s.requests.length > 1000 ||
    !Array.isArray(s.feedback) ||
    s.feedback.length > 1000 ||
    !Array.isArray(s.subscribers) ||
    s.subscribers.length > 2000
  )
    throw new Error("Unsupported or oversized workspace backup.");
  const bounded = (v: unknown, max = 5000) =>
    typeof v === "string" && v.length <= max;
  const timestamp = (v: unknown) =>
    bounded(v, 40) && Number.isFinite(Date.parse(v as string));
  const ids = new Set<string>();
  for (const r of s.requests) {
    if (r.replyTranslation !== undefined) validateReplyTranslation(r.replyTranslation, r.reply, r.language);
    if (
      !r ||
      !bounded(r.id, 60) ||
      !r.id ||
      ids.has(r.id) ||
      !bounded(r.token, 60) ||
      r.token.length < 20 ||
      !/^[A-Z0-9]{8}$/.test(r.code) ||
      r.consent !== true ||
      ![
        "requested",
        "needs_details",
        "quoted",
        "confirmed",
        "declined",
        "cancelled",
        "expired",
        "completed",
      ].includes(r.status) ||
      !["visit", "question"].includes(r.kind) ||
      !["email", "sms", "website"].includes(r.channel) ||
      !isMessageLanguage(r.language) ||
      !Number.isInteger(r.revision) ||
      r.revision < 0 ||
      !Number.isInteger(r.guests) ||
      r.guests < 0 ||
      r.guests > 100 ||
      !Number.isInteger(r.total) ||
      r.total < 0 ||
      r.total > 100000000 ||
      !Number.isInteger(r.minutes) ||
      r.minutes < 0 ||
      r.minutes > 9600 ||
      !Array.isArray(r.activityIds) ||
      r.activityIds.length > 20 ||
      r.activityIds.some((id) => !bounded(id, 60)) ||
      !bounded(r.name, 100) ||
      !bounded(r.contact, 150) ||
      !bounded(r.reply) ||
      !bounded(r.special) ||
      !bounded(r.question) ||
      !bounded(r.source, 80) ||
      !bounded(r.date, 10) ||
      !bounded(r.time, 5) ||
      !/^[A-Z]{3}$/.test(r.currency) ||
      !timestamp(r.createdAt) ||
      (r.quoteExpiresAt !== null && !timestamp(r.quoteExpiresAt)) ||
      typeof r.demo !== "boolean" ||
      (r.hosted !== undefined && typeof r.hosted !== "boolean")
    )
      throw new Error("Invalid request in backup.");
    if (
      r.kind === "visit" &&
      (!/^\d{4}-\d{2}-\d{2}$/.test(r.date) ||
        !/^([01]\d|2[0-3]):[0-5]\d$/.test(r.time) ||
        r.guests < 1)
    )
      throw new Error("Invalid visit in backup.");
    ids.add(r.id);
  }
  ids.clear();
  for (const f of s.feedback) {
    if (
      !f ||
      !bounded(f.id, 60) ||
      !f.id ||
      ids.has(f.id) ||
      (f.requestId !== null && !bounded(f.requestId, 60)) ||
      f.analysisConsent !== true ||
      !bounded(f.text) ||
      !bounded(f.memorable, 2000) ||
      !bounded(f.change, 2000) ||
      !bounded(f.source, 80) ||
      !["yes", "maybe", "no"].includes(f.recommend) ||
      !["en", "sw"].includes(f.language) ||
      !timestamp(f.createdAt) ||
      typeof f.testimonialConsent !== "boolean" ||
      typeof f.marketingConsent !== "boolean" ||
      typeof f.demo !== "boolean"
    )
      throw new Error("Invalid feedback in backup.");
    ids.add(f.id);
  }
  ids.clear();
  for (const item of s.subscribers) {
    if (
      !item ||
      !bounded(item.id, 60) ||
      !item.id ||
      ids.has(item.id) ||
      !bounded(item.email, 150) ||
      !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(item.email) ||
      !timestamp(item.consentAt) ||
      typeof item.demo !== "boolean"
    )
      throw new Error("Invalid newsletter permission in backup.");
    ids.add(item.id);
  }
  const audit = Array.isArray(s.audit) ? s.audit.slice(0, 500) : [];
  if (
    audit.some(
      (a) =>
        !a ||
        !bounded(a.id, 60) ||
        !timestamp(a.at) ||
        !bounded(a.action, 60) ||
        !bounded(a.recordId, 60) ||
        !bounded(a.detail, 500),
    )
  )
    throw new Error("Invalid decision history in backup.");
  return {
    ...s,
    business: validateBusiness(s.business),
    draft: validateBusiness(s.draft),
    language: s.language === "sw" ? "sw" : "en",
    mode: s.mode === "own" ? "own" : "demo",
    audit,
    reviewStep: 0,
    lastSync: timestamp(s.lastSync) ? s.lastSync : null,
  };
}
export function listingText(b: Business, lang: Language) {
  const sw = lang === "sw";
  return `${b.name}\n\n${sw ? b.introSw : b.intro}\n\n${b.location}\n\n${b.activities
    .filter((a) => a.enabled)
    .map(
      (a) =>
        `${sw ? a.nameSw : a.name}: ${a.minutes} min · ${money(a.price, b.currency)} ${sw ? "kwa mtu" : "per person"}`,
    )
    .join(
      "\n",
    )}\n\n${sw ? "Wageni wengi zaidi" : "Maximum group"}: ${b.capacity}\n${sw ? "Lugha" : "Languages"}: ${b.languages.join(", ")}\n${sw ? "Nyakati za kuanza" : "Start times"}: ${b.startTimes.join(", ")}\n\n${sw ? b.directionsSw : b.directions}\n\n${sw ? b.accessibilitySw : b.accessibility}\n\n${b.phone ? `Phone: ${b.phone}\n` : ""}${b.email ? `Email: ${b.email}\n` : ""}${b.demo ? "DEMONSTRATION ONLY — fictional location and illustrative prices." : "Visits require operator confirmation."}`;
}
