// Publish the prebuilt offline demo without installing the Worker toolchain.
import { readFile, rm, cp, mkdir } from 'node:fs/promises';
import { createHash } from 'node:crypto';
import { fileURLToPath } from 'node:url';
import { join, resolve, sep } from 'node:path';

const root = fileURLToPath(new URL('../', import.meta.url));
const source = join(root, 'public');
const manifest = JSON.parse(await readFile(join(source, 'offline-manifest.json')));
for (const entry of manifest.files) {
  const path = resolve(source, '.' + entry.url);
  if (!path.startsWith(source + sep)) throw new Error('Invalid asset path');
  const bytes = await readFile(path);
  if (bytes.length !== entry.bytes || createHash('sha256').update(bytes).digest('hex') !== entry.sha256) {
    throw new Error(`Offline asset failed verification: ${entry.url}`);
  }
}
const output = join(root, 'static');
await rm(output, { recursive: true, force: true });
await mkdir(output, { recursive: true });
await cp(source, output, {
  recursive: true,
  filter: path => !path.startsWith(join(source, 'translation', 'chunks')),
});
console.log(`Static demo ready: ${manifest.files.length} verified assets.`);
