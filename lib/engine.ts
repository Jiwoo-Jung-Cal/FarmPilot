import model from "./compact-model.json";
import {
  THEMES,
  splitQuotes,
  type Review,
  type Evidence,
  type ThemeId,
  type Tone,
} from "./domain";
export const MODEL_BYTES = JSON.stringify(model).length;
export const ENGINE_VERSION = "1.0.0";
export function tokenize(text: string) {
  return (
    text
      .toLowerCase()
      .normalize("NFKD")
      .replace(/[\u0300-\u036f]/g, "")
      .match(/\b\w\w+\b/g) ?? []
  );
}
export function outOfScope(text: string) {
  return /\b(bank|accounts?|password|medical|medication|doctor|fever|football|cryptocurrency|laptop|computer|game|forecast)\b/i.test(
    text,
  );
}
export function compactClassify(text: string) {
  const tokens = tokenize(text),
    terms = [
      ...tokens,
      ...tokens.slice(0, -1).map((t, i) => `${t} ${tokens[i + 1]}`),
    ];
  const counts: Record<number, number> = {};
  const vocab = model.vocabulary as Record<string, number>;
  for (const t of terms) {
    if (vocab[t] !== undefined) counts[vocab[t]] = (counts[vocab[t]] ?? 0) + 1;
  }
  const values = Object.entries(counts).map(([i, n]) => [
    Number(i),
    (1 + Math.log(n)) * model.idf[Number(i)],
  ]);
  const norm = Math.sqrt(values.reduce((s, [, v]) => s + v * v, 0)) || 1;
  const logits = model.weights.map((w, c) =>
    values.reduce((s, [i, v]) => s + (w[i] * v) / norm, model.intercept[c]),
  );
  const max = Math.max(...logits);
  const exps = logits.map((v) => Math.exp(v - max));
  const sum = exps.reduce((s, v) => s + v, 0);
  const ranking = exps
    .map((v, i) => ({ label: model.classes[i], score: v / sum }))
    .sort((a, b) => b.score - a.score);
  const best = ranking[0],
    margin = best.score - ranking[1].score;
  const coverage =
    tokens.filter((t) => vocab[t] !== undefined).length /
    Math.max(tokens.length, 1);
  const uncertain =
    outOfScope(text) ||
    best.label === "other" ||
    best.score < model.threshold ||
    margin < model.margin ||
    coverage < model.featureCoverage ||
    tokens.length < 4;
  return {
    theme: uncertain ? null : (best.label as ThemeId),
    score: best.score,
    margin,
    coverage,
  };
}
// The tone is intentionally conservative and transparent. A classifier finding is
// not a fact about satisfaction. Only explicit feedback cues establish polarity.
export function toneFor(text: string): Tone {
  const s = text.toLowerCase();
  const negativeText = s.replace(
    /\b(?:never|not) rushed\b|\bno (?:waiting|hidden fees|extra (?:charges|fees))\b/g,
    "",
  );
  const negative =
    /\b(wish|needed|need|please|could not|couldn't|cannot|can't|difficult|confus\w*|hard to|not enough|too (?:long|fast|quickly|much|hot)|nowhere|no signs|no shade|no seats|no water|no toilet|got lost|struggled|rushed|late|missed|surpris\w*|extra|disappoint\w*|wanted more|would help|would make|next time|longer than|better directions|not (?:clear|good|easy)|little more|only watch|only look)\b/.test(
      negativeText,
    );
  const positive =
    /\b(loved?|enjoy\w*|wonderful|perfect|highlight|helpful|fascinat\w*|appreciat\w*|comfortable|easy|clear(?:ly)?|excellent|lovely|worth|good value|best|right length|on time|relaxed|no waiting|no hidden|never rushed)\b/.test(
      s,
    );
  if (negative) return "improve";
  if (positive) return "positive";
  return "uncertain";
}
export function analyzeCompact(review: Review): Evidence[] {
  if (review.language !== "en")
    return [
      {
        theme: null,
        tone: "uncertain",
        score: 0,
        margin: 0,
        quote: review.text,
        start: 0,
        end: review.text.length,
      },
    ];
  return splitQuotes(review.text).map((part) => ({
    ...part,
    ...compactClassify(part.quote),
    tone: toneFor(part.quote),
  }));
}
type Encoder = (texts: string[]) => Promise<number[][]>;
let encoder: Encoder | undefined;
let prototypes: { theme: ThemeId; vector: number[] }[] = [];
export function cosine(a: number[], b: number[]) {
  let dot = 0,
    na = 0,
    nb = 0;
  for (let i = 0; i < a.length; i++) {
    dot += a[i] * b[i];
    na += a[i] * a[i];
    nb += b[i] * b[i];
  }
  return dot / Math.sqrt(na * nb || 1);
}
type LocalRuntime = {
  env: {
    allowRemoteModels: boolean;
    allowLocalModels: boolean;
    localModelPath: string;
    useBrowserCache: boolean;
    backends: { onnx: { wasm: { wasmPaths: string; numThreads: number } } };
  };
  pipeline: (
    task: string,
    name: string,
    options: {
      dtype: string;
      device: string;
      progress_callback: (p: { status: string; progress?: number }) => void;
    },
  ) => Promise<
    (
      texts: string[],
      options: { pooling: string; normalize: boolean },
    ) => Promise<{ tolist: () => number[][] }>
  >;
};
let loading: Promise<void> | undefined;
export function loadSemantic(progress?: (v: string) => void): Promise<void> {
  if (encoder) return Promise.resolve();
  if (!loading)
    loading = loadSemanticRuntime(progress).finally(() => {
      loading = undefined;
    });
  return loading;
}
async function loadSemanticRuntime(progress?: (v: string) => void) {
  if (encoder) return;
  // Browser-only dynamic import: all binaries and model assets are served locally.
  const runtimeWindow = window as typeof window & {
    noorRuntime?: LocalRuntime;
  };
  const transformers =
    runtimeWindow.noorRuntime ??
    (await new Promise<LocalRuntime>((resolve, reject) => {
      const script = document.createElement("script");
      script.type = "module";
      script.src = "/runtime/loader.js";
      script.onload = () =>
        runtimeWindow.noorRuntime
          ? resolve(runtimeWindow.noorRuntime)
          : reject(new Error("Model runtime did not initialize."));
      script.onerror = () => reject(new Error("Model runtime could not load."));
      document.head.appendChild(script);
    }));
  const { env, pipeline } = transformers;
  env.allowRemoteModels = false;
  env.allowLocalModels = true;
  env.localModelPath = "/models/";
  env.useBrowserCache = false;
  env.backends.onnx.wasm.wasmPaths = "/runtime/";
  env.backends.onnx.wasm.numThreads = 1;
  const pipe = await pipeline("feature-extraction", "minilm", {
    dtype: "q8",
    device: "wasm",
    progress_callback: (p: { status: string; progress?: number }) =>
      progress?.(p.progress ? `${Math.round(p.progress)}%` : p.status),
  });
  const encode: Encoder = async (texts) => {
    const output = await pipe(texts, { pooling: "mean", normalize: true });
    return output.tolist();
  };
  await initializeSemantic(encode);
}
export async function initializeSemantic(encode: Encoder) {
  const texts = THEMES.flatMap((t) => [
    ...t.examples.positive,
    ...t.examples.improve,
  ]);
  const vectors = await encode(texts);
  prototypes = [];
  let i = 0;
  for (const t of THEMES) {
    for (
      let j = 0;
      j < t.examples.positive.length + t.examples.improve.length;
      j++
    )
      prototypes.push({ theme: t.id, vector: vectors[i++] });
  }
  encoder = encode;
}
export async function matchSemantic(
  question: string,
  options: { id: string; text: string }[],
) {
  if (!encoder) throw new Error("The local model is not loaded.");
  const vectors = await encoder([question, ...options.map((o) => o.text)]);
  const scores = new Map<string, number>();
  options.forEach((o, i) =>
    scores.set(
      o.id,
      Math.max(scores.get(o.id) ?? -1, cosine(vectors[0], vectors[i + 1])),
    ),
  );
  const ranking = [...scores].sort((a, b) => b[1] - a[1]);
  return {
    id: ranking[0][0],
    score: ranking[0][1],
    margin: ranking[0][1] - (ranking[1]?.[1] ?? 0),
  };
}
export async function analyzeSemantic(review: Review): Promise<Evidence[]> {
  if (!encoder) throw new Error("Semantic model is not loaded.");
  if (review.language !== "en") return analyzeCompact(review);
  const parts = splitQuotes(review.text);
  const vectors = await encoder(parts.map((p) => p.quote));
  return parts.map((part, i) => {
    const scores = THEMES.map((t) => ({
      theme: t.id,
      score: Math.max(
        ...prototypes
          .filter((p) => p.theme === t.id)
          .map((p) => cosine(p.vector, vectors[i])),
      ),
    })).sort((a, b) => b.score - a.score);
    const score = scores[0].score,
      margin = score - scores[1].score;
    const compact = compactClassify(part.quote);
    const uncertain =
      outOfScope(part.quote) ||
      score < 0.37 ||
      margin < 0.045 ||
      tokenize(part.quote).length < 4 ||
      (compact.theme === null && compact.coverage < 0.2);
    return {
      ...part,
      theme: uncertain ? null : scores[0].theme,
      score,
      margin,
      tone: toneFor(part.quote),
    };
  });
}
export const KEYWORD_BASELINE: Record<ThemeId, RegExp> = {
  participation: /\b(hands-on|picking|grinding|roasting|brewing)\b/i,
  learning: /\b(story|stories|explanation|history)\b/i,
  directions: /\b(directions|signs|entrance|lost|gate)\b/i,
  comfort: /\b(shade|toilets|water|benches|accessibility)\b/i,
  pacing: /\b(time|waiting|duration|rushed|late)\b/i,
  value: /\b(price|cost|payment|fees|ticket)\b/i,
};
export function baseline(text: string) {
  return (
    (Object.entries(KEYWORD_BASELINE) as [ThemeId, RegExp][]).find(([, re]) =>
      re.test(text),
    )?.[0] ?? null
  );
}
