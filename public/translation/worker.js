import { pipeline, env } from "/runtime/transformers.web.min.js";
import { openLanguageArchive } from "/translation/archive.js";
env.allowRemoteModels = false;
env.allowLocalModels = true;
env.localModelPath = "/translation/models/";
env.useBrowserCache = false;
env.backends.onnx.wasm.wasmPaths = "/runtime/";
env.backends.onnx.wasm.numThreads = 1;
env.backends.onnx.wasm.proxy = false;

const PREFIX = "farmpilot-translation-v1-";
const nativeFetch = self.fetch.bind(self);
let manifest, translator, loadedPair, queue = Promise.resolve();
const url = path => new URL(path, self.location.origin).href;
const digest = async buffer => [...new Uint8Array(await crypto.subtle.digest("SHA-256", buffer))].map(x => x.toString(16).padStart(2, "0")).join("");
async function catalog() {
  if (!manifest) { const response = await nativeFetch("/translation/manifest.json"); if (!response.ok) throw new Error("Language catalog is unavailable. Connect once to install it."); manifest = await response.json(); }
  return manifest;
}
const cacheName = pack => PREFIX + pack.pair + "-" + pack.fingerprint;
const runtimeName = () => PREFIX + "runtime-" + manifest.runtime.map(f => f.sha256.slice(0, 8)).join("");
async function installed(pack) { const c = await caches.open(cacheName(pack)); return !!await c.match(url("/translation/ready/" + pack.pair)); }
async function verifiedDownload(file, cache, progress, archive) {
  const entry = archive?.get(file.url);
  let data;
  if (entry) { if (entry.bytes !== file.bytes) throw new Error("The language file has an unexpected size."); data = await entry.read(); }
  else { const response = await nativeFetch(file.url); if (!response.ok) throw new Error("Load the provided FarmPilot Models ZIP to install this language."); data = await response.arrayBuffer(); }
  if (data.byteLength !== file.bytes || await digest(data) !== file.sha256) throw new Error("A language file did not pass its integrity check. No incomplete pack was installed.");
  await cache.put(url(file.url), new Response(data, { headers: { "Content-Type": file.url.endsWith(".mjs") || file.url.endsWith(".js") ? "text/javascript" : "application/octet-stream" } }));
  progress(file.bytes);
}
async function install(pack, progress, archive) {
  if (await installed(pack)) return;
  const name = cacheName(pack); await caches.delete(name); const cache = await caches.open(name);
  let bytes = 0;
  try {
    const runtime = await caches.open(runtimeName());
    if (!await runtime.match(url("/translation/ready/runtime"))) {
      try { for (const file of manifest.runtime) await verifiedDownload(file, runtime, () => {}, archive); await runtime.put(url("/translation/ready/runtime"), new Response("verified")); }
      catch (error) { await caches.delete(runtimeName()); throw error; }
    }
    for (const file of pack.files.flatMap(f => f.chunks)) await verifiedDownload(file, cache, n => { bytes += n; progress(`Installing ${pack.label}: ${Math.ceil(bytes / 1048576)} MB`); }, archive);
    await cache.put(url("/translation/ready/" + pack.pair), new Response(pack.fingerprint));
  } catch (error) { await caches.delete(name); throw error; }
}
// ONNX files are split for hosting. Assemble only verified, installed local
// chunks; never fetch a user's message or a model from a third party.
self.fetch = async function(input, options) {
  const requested = new URL(typeof input === "string" ? input : input.url, self.location.origin);
  if (requested.origin !== self.location.origin) throw new Error("Remote translation requests are disabled.");
  const m = await catalog();
  if (requested.pathname.startsWith("/translation/models/")) {
    const path = requested.pathname.slice("/translation/models/".length);
    const pair = path.split("/")[0]; const pack = m.packs.find(p => p.pair === pair);
    if (!pack || !await installed(pack)) throw new Error("Download the required language pack first.");
    const file = pack.files.find(f => f.path === path.slice(pair.length + 1));
    if (!file) return new Response("Not found", { status: 404 });
    const cache = await caches.open(cacheName(pack)); const parts = [];
    for (const chunk of file.chunks) { const response = await cache.match(url(chunk.url)); if (!response) throw new Error("Language storage was cleared. Download the pack again."); parts.push(await response.arrayBuffer()); }
    return new Response(new Blob(parts), { headers: { "Content-Type": file.path.endsWith(".json") ? "application/json" : "application/octet-stream" } });
  }
  if (requested.pathname.startsWith("/runtime/")) {
    const runtime = await caches.open(runtimeName());
    if (await runtime.match(url("/translation/ready/runtime"))) { const response = await runtime.match(requested.href); if (response) return response; }
    for (const pack of m.packs) { if (!await installed(pack)) continue; const response = await (await caches.open(cacheName(pack))).match(requested.href); if (response) return response; }
  }
  return nativeFetch(input, options);
};
function pairs(source, target) { if (source === target) return []; return source === "en" || target === "en" ? [`${source}-${target}`] : [`${source}-en`, `en-${target}`]; }
async function release() { if (translator) await translator.dispose(); translator = undefined; loadedPair = undefined; }
async function operation(data, progress) {
  const m = await catalog();
  if (data.op === "status") return Promise.all(m.packs.map(async p => ({ pair: p.pair, bytes: p.bytes + m.runtime.reduce((s, f) => s + f.bytes, 0), label: p.label, installed: await installed(p), checkpoint: p.checkpoint, downloadAvailable: m.distribution !== "archive" })));
  if (data.op === "import") {
    const archive = await openLanguageArchive(data.archive);
    const packs = m.packs.filter(p => p.files.flatMap(f => f.chunks).every(c => archive.has(c.url)));
    if (!packs.length || m.runtime.some(f => !archive.has(f.url))) throw new Error("This ZIP is incomplete. Choose a provided FarmPilot Models archive including its runtime.");
    for (const pack of packs) await install(pack, progress, archive);
    return true;
  }
  if (data.op === "install") { for (const pair of data.pairs) { const pack = m.packs.find(p => p.pair === pair); if (!pack) throw new Error("This language is unavailable."); await install(pack, progress); } return true; }
  if (data.op === "remove") { await release(); for (const key of await caches.keys()) if (key.startsWith(PREFIX)) await caches.delete(key); return true; }
  if (data.op !== "translate") throw new Error("Unknown translation action.");
  if (!Object.hasOwn(m.languages, data.source) || !Object.hasOwn(m.languages, data.target)) throw new Error("Choose a supported language.");
  if (typeof data.input !== "string" || !data.input.trim() || data.input.length > 1000) throw new Error("Translate a message of 1–1,000 characters at a time.");
  let text = data.input.trim(); const models = [];
  for (const pair of pairs(data.source, data.target)) {
    const pack = m.packs.find(p => p.pair === pair); if (!pack || !await installed(pack)) throw new Error("Download the required language pack first.");
    progress(`Translating ${pack.label} on this device…`);
    if (loadedPair !== pair) { await release(); translator = await pipeline("translation", pair, { device: "wasm", dtype: "q8" }); loadedPair = pair; }
    const tokens = translator.tokenizer(text, { truncation: false });
    if (Number(tokens.input_ids.dims.at(-1)) > 256) throw new Error("This message is too long for the small model. Translate it in shorter parts.");
    const output = await translator(text, { max_new_tokens: 256, num_beams: 1, do_sample: false });
    text = output[0].translation_text; if (!text?.trim()) throw new Error("The model returned no translation. Write or review the reply manually."); models.push(pack.label + " · " + pack.checkpoint);
  }
  return { text, models };
}
self.onmessage = ({ data }) => {
  queue = queue.then(async () => {
    try { const result = await operation(data, progress => self.postMessage({ id: data.id, progress })); self.postMessage({ id: data.id, result }); }
    catch (error) { await release(); self.postMessage({ id: data.id, error: error.message || "Translation failed. Your original message is unchanged." }); }
  });
};
