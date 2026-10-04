// Read only bounded, known model entries. No ZIP paths are extracted to disk.
export async function openLanguageArchive(blob) {
  if (!blob?.slice || blob.size < 22 || blob.size > 512 * 1048576) throw new Error("Choose a FarmPilot language ZIP smaller than 512 MB.");
  const tail = new DataView(await blob.slice(Math.max(0, blob.size - 65557)).arrayBuffer());
  let end = -1;
  for (let i = tail.byteLength - 22; i >= 0; i--) if (tail.getUint32(i, true) === 0x06054b50 && i + 22 + tail.getUint16(i + 20, true) === tail.byteLength) { end = i; break; }
  if (end < 0 || tail.getUint16(end + 4, true) || tail.getUint16(end + 6, true)) throw new Error("This is not a supported language archive.");
  const count = tail.getUint16(end + 10, true), size = tail.getUint32(end + 12, true), offset = tail.getUint32(end + 16, true);
  if (count > 1000 || count !== tail.getUint16(end + 8, true) || size > 1048576 || offset + size > blob.size - 22) throw new Error("Invalid language archive directory.");
  const directory = new DataView(await blob.slice(offset, offset + size).arrayBuffer()), entries = new Map(), decoder = new TextDecoder("utf-8", { fatal: true });
  let cursor = 0;
  for (let i = 0; i < count; i++) {
    if (cursor + 46 > size || directory.getUint32(cursor, true) !== 0x02014b50) throw new Error("Invalid language archive entry.");
    const flags = directory.getUint16(cursor + 8, true), method = directory.getUint16(cursor + 10, true), compressed = directory.getUint32(cursor + 20, true), bytes = directory.getUint32(cursor + 24, true), length = directory.getUint16(cursor + 28, true), extra = directory.getUint16(cursor + 30, true), comment = directory.getUint16(cursor + 32, true), local = directory.getUint32(cursor + 42, true);
    if (cursor + 46 + length + extra + comment > size) throw new Error("Invalid language archive entry length.");
    const name = decoder.decode(new Uint8Array(directory.buffer, cursor + 46, length));
    cursor += 46 + length + extra + comment;
    if (!name.startsWith("FarmPilot/public/")) continue;
    const relative = name.slice("FarmPilot/public/".length);
    if (!/^(translation\/chunks\/[^/]+\.bin|runtime\/[^/]+)$/.test(relative) || relative.includes("\\") || relative.includes("..")) continue;
    const key = "/" + relative;
    if (entries.has(key) || flags & 1 || ![0, 8].includes(method) || bytes > 32 * 1048576 || compressed > 33 * 1048576 || local + 30 > offset) throw new Error("Unsupported or oversized model archive entry.");
    entries.set(key, { bytes, async read() {
      const header = new DataView(await blob.slice(local, local + 30).arrayBuffer());
      if (header.getUint32(0, true) !== 0x04034b50 || header.getUint16(8, true) !== method || header.getUint16(6, true) & 1) throw new Error("Invalid model file header.");
      const nameBytes = header.getUint16(26, true), start = local + 30 + nameBytes + header.getUint16(28, true);
      if (start + compressed > offset || decoder.decode(await blob.slice(local + 30, local + 30 + nameBytes).arrayBuffer()) !== name) throw new Error("Invalid model file boundary.");
      let stream = blob.slice(start, start + compressed).stream();
      if (method === 8) {
        try { stream = stream.pipeThrough(new DecompressionStream("deflate-raw")); }
        catch { throw new Error("This browser cannot open the language ZIP. Use a current browser or the desktop installer."); }
      }
      const reader = stream.getReader(), parts = []; let total = 0;
      try { while (true) { const { value, done } = await reader.read(); if (done) break; total += value.byteLength; if (total > bytes) throw new Error("Model archive expansion exceeded its declared size."); parts.push(value); } }
      finally { await reader.cancel().catch(() => {}); }
      if (total !== bytes) throw new Error("The language archive is incomplete.");
      return new Blob(parts).arrayBuffer();
    } });
  }
  if (cursor !== size || !entries.size) throw new Error("Choose one of the provided FarmPilot Models ZIP files.");
  return entries;
}
