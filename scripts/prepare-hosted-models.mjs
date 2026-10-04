// Website distribution uses side-loaded, hash-verified language archives.
// Desktop builds keep all source model files in public/translation/chunks.
import { readFile, writeFile, rm } from 'node:fs/promises';
import { createHash } from 'node:crypto';
const directory = new URL('../dist/client/', import.meta.url);
const catalogPath = new URL('translation/manifest.json', directory);
const catalog = JSON.parse(await readFile(catalogPath));
catalog.distribution = 'archive';
await rm(new URL('translation/chunks/', directory), { recursive: true, force: true });
const bytes = Buffer.from(JSON.stringify(catalog, null, 2) + '\n');
await writeFile(catalogPath, bytes);
const offlinePath = new URL('offline-manifest.json', directory);
const offline = JSON.parse(await readFile(offlinePath));
const entry = offline.files.find(f => f.url === '/translation/manifest.json');
if (!entry) throw new Error('Translation catalog is missing from the offline manifest.');
entry.bytes = bytes.byteLength; entry.sha256 = createHash('sha256').update(bytes).digest('hex');
offline.coreBytes = offline.files.filter(f => f.profile === 'core').reduce((s, f) => s + f.bytes, 0);
offline.totalBytes = offline.files.reduce((s, f) => s + f.bytes, 0);
await writeFile(offlinePath, JSON.stringify(offline, null, 2) + '\n');
console.log(JSON.stringify({ websiteLanguageDistribution: 'verified archive import', coreBytes: offline.coreBytes, totalBytes: offline.totalBytes }));
