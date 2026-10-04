import { type MessageLanguage } from "./workflow";
export { MESSAGE_LANGUAGES, isMessageLanguage, type MessageLanguage } from "./workflow";
export function translationPairs(source: MessageLanguage, target: MessageLanguage) {
  if (source === target) return [];
  return source === "en" || target === "en" ? [`${source}-${target}`] : [`${source}-en`, `en-${target}`];
}
export function translationWarnings(source: string, translated: string) {
  const numbers = (s: string) => (s.match(/\d+(?:[.,:/-]\d+)*/g) ?? []).sort();
  const warnings: string[] = [];
  if (JSON.stringify(numbers(source)) !== JSON.stringify(numbers(translated))) warnings.push("Numbers, dates or times changed. Correct the translation before applying it.");
  for (const code of ["KES", "USD", "EUR", "GBP", "TZS", "UGX"]) {
    const count = (s: string) => (s.match(new RegExp(`\\b${code}\\b`, "g")) ?? []).length;
    if (count(source) !== count(translated)) warnings.push(`Check the currency ${code}.`);
  }
  if (!translated.trim()) warnings.push("The translation is empty.");
  return warnings;
}
type ResponseMessage = { id: number; result?: unknown; error?: string; progress?: string };
let worker: Worker | undefined;
let sequence = 0;
const pending = new Map<number, { resolve: (value: unknown) => void; reject: (error: Error) => void; progress?: (s: string) => void }>();
function run<T>(op: string, args: object = {}, progress?: (s: string) => void): Promise<T> {
  if (!worker) {
    worker = new Worker("/translation/worker.js", { type: "module" });
    worker.onmessage = ({ data }: MessageEvent<ResponseMessage>) => {
      const p = pending.get(data.id); if (!p) return;
      if (data.progress) { p.progress?.(data.progress); return; }
      pending.delete(data.id); if (data.error) p.reject(new Error(data.error)); else p.resolve(data.result);
    };
    worker.onerror = () => { for (const p of pending.values()) p.reject(new Error("Translation could not start on this device. Your original message is unchanged.")); pending.clear(); worker?.terminate(); worker = undefined; };
  }
  return new Promise((resolve, reject) => { const id = ++sequence; pending.set(id, { resolve: value => resolve(value as T), reject, progress }); worker!.postMessage({ id, op, ...args }); });
}
export type TranslationPack = { pair: string; bytes: number; label: string; installed: boolean; checkpoint: string; downloadAvailable?: boolean };
export const translationStatus = () => run<TranslationPack[]>("status");
export const installTranslation = (pairs: string[], progress?: (s: string) => void) => run<void>("install", { pairs }, progress);
export const importTranslation = (archive: File, progress?: (s: string) => void) => run<void>("import", { archive }, progress);
export const removeTranslations = () => run<void>("remove");
export const translateMessage = (input: string, source: MessageLanguage, target: MessageLanguage, progress?: (s: string) => void) => run<{ text: string; models: string[] }>("translate", { input, source, target }, progress);
