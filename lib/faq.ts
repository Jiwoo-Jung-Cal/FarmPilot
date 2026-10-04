import { type Business, type Language, money } from "./workflow";
import { matchSemantic } from "./engine";
const BANK = [
  {
    id: "activities",
    en: [
      "What can we do on the farm?",
      "Which activities do you offer?",
      "Tell me about the coffee experience.",
    ],
    sw: /\bshughuli\b/,
  },
  {
    id: "price",
    en: [
      "How much does the visit cost?",
      "What is the price per person?",
      "Is tasting included in the ticket?",
    ],
    sw: /bei|gharama|malipo/,
  },
  {
    id: "duration",
    en: [
      "How long does the experience take?",
      "What is the duration of the tour?",
      "How much time should we allow?",
    ],
    sw: /muda|dakika/,
  },
  {
    id: "directions",
    en: [
      "How do we get to the farm?",
      "Where is the meeting point?",
      "Can you send directions and transport information?",
    ],
    sw: /wapi|maelekezo|kufika/,
  },
  {
    id: "access",
    en: [
      "Is the farm accessible for wheelchair users?",
      "Are there steep paths or places to rest?",
      "What access arrangements are available?",
    ],
    sw: /ufikivu|mteremko|kiti/,
  },
  {
    id: "languages",
    en: [
      "What languages are spoken?",
      "Can the guide speak Swahili?",
      "Do you offer an English visit?",
    ],
    sw: /lugha|kiswahili|kiingereza/,
  },
];
export async function faqAnswer(
  question: string,
  b: Business,
  lang: Language,
  semantic: boolean,
) {
  const q = question.trim();
  if (
    q.length < 5 ||
    q.length > 500 ||
    /[\u0370-\u1fff\u2e80-\uffff]/.test(q) ||
    /\b(available|availability|tomorrow|today|saturday|sunday|book|discount|refund|allerg\w*|safe|safety|medical|sick|children|kids|pets|dogs|lunch|food|vegan|vegetarian|insurance|parking|toilets?)\b|kesho|leo|nafasi|punguzo/i.test(
      q,
    )
  )
    return { answer: null, method: "human" };
  let id: string | undefined,
    method = "reviewed phrase";
  if (lang === "sw") {
    const matches = BANK.filter((f) => f.sw.test(q.toLowerCase()));
    if (matches.length === 1) id = matches[0].id;
  } else if (semantic) {
    const options = BANK.flatMap((f) =>
      f.en.map((t) => ({ id: f.id, text: t })),
    );
    const result = await matchSemantic(q, options);
    if (result.score >= 0.52 && result.margin >= 0.045) {
      id = result.id;
      method = "local semantic match";
    }
  } else {
    const rules: Record<string, RegExp> = {
      activities: /\b(activities|offer|do on|experience)\b/i,
      price: /\b(price|cost|much|ticket)\b/i,
      duration: /\b(long|duration|minutes|time.*allow)\b/i,
      directions: /\b(where|directions|meeting|transport|get to)\b/i,
      access: /\b(accessible|wheelchair|steep|rest)\b/i,
      languages: /\b(language|swahili|english)\b/i,
    };
    const matches = Object.entries(rules).filter(([, r]) => r.test(q));
    if (matches.length === 1) id = matches[0][0];
  }
  const sw = lang === "sw",
    enabled = b.activities.filter((a) => a.enabled);
  const answers: Record<string, string> = {
    activities: enabled.map((a) => (sw ? a.nameSw : a.name)).join(", "),
    price:
      enabled
        .map(
          (a) =>
            `${sw ? a.nameSw : a.name}: ${money(a.price, b.currency)} ${sw ? "kwa mtu" : "per person"}`,
        )
        .join("\n") +
      (sw
        ? "\nBei ya jumla na nafasi zinahitaji idhini ya Noor."
        : "\nThe total and availability require Noor’s approval."),
    duration: enabled
      .map(
        (a) =>
          `${sw ? a.nameSw : a.name}: ${a.minutes} ${sw ? "dakika" : "minutes"}`,
      )
      .join("\n"),
    directions: sw ? b.directionsSw : b.directions,
    access: sw ? b.accessibilitySw : b.accessibility,
    languages: b.languages.join(", "),
  };
  return { answer: id ? answers[id] || null : null, method };
}
