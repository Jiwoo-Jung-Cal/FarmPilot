import { readFile } from "node:fs/promises";
import { resolve } from "node:path";
import { createHash } from "node:crypto";
import { createRequire } from "node:module";
import assert from "node:assert/strict";
const require = createRequire(import.meta.url);
const { createAssetHandler } = require("../desktop/protocol.cjs");
const root = resolve(process.argv[2] || "public");
const manifest = JSON.parse(
  await readFile(resolve(root, "offline-manifest.json"), "utf8"),
);
const handle = createAssetHandler(root);
let verifiedBytes = 0;
for (const item of manifest.files) {
  const response = await handle(new Request(`noor://app${item.url}`));
  assert.equal(response.status, 200, item.url);
  const bytes = Buffer.from(await response.arrayBuffer());
  assert.equal(bytes.length, item.bytes, item.url);
  assert.equal(
    createHash("sha256").update(bytes).digest("hex"),
    item.sha256,
    item.url,
  );
  if (item.url.endsWith(".wasm"))
    assert.equal(response.headers.get("content-type"), "application/wasm");
  verifiedBytes += bytes.length;
}
assert.equal(verifiedBytes, manifest.totalBytes);
// Optional translation chunks are outside the core/full download profiles but
// must also be present and exact in a bundled desktop release.
const translations = JSON.parse(await readFile(resolve(root,"translation/manifest.json"),"utf8"));
let translationBytes=0;
for(const pack of translations.packs)for(const file of pack.files)for(const chunk of file.chunks){
 const response=await handle(new Request(`noor://app${chunk.url}`));assert.equal(response.status,200,chunk.url);
 const bytes=Buffer.from(await response.arrayBuffer());assert.equal(bytes.length,chunk.bytes);assert.equal(createHash("sha256").update(bytes).digest("hex"),chunk.sha256);translationBytes+=bytes.length;
}

const model = manifest.files.find((f) =>
  f.url.endsWith("/model_quantized.onnx"),
);
assert.equal(
  model?.sha256,
  "afdb6f1a0e45b715d0bb9b11772f032c399babd23bfc31fed1c170afc848bdb1",
);
console.log(
  JSON.stringify({
    status: "passed",
    files: manifest.files.length,
    verifiedBytes,
    translationBytes,
    translationDirections: translations.packs.length,
    modelSha256: model.sha256,
    method:
      "Exact packaged files fetched through the desktop asset handler; SHA-256, length and WASM MIME checked",
    nativeLaunch: "pending",
  }),
);
