"""Check embedded Mach-O CodeDirectory page hashes in a development Mac bundle.

This does not verify Apple's trust policy, notarization or runtime behavior.
Run native codesign verification and launch testing on the intended Mac.
"""
import hashlib
import json
import plistlib
import struct
import sys
from pathlib import Path

bundle = Path(sys.argv[1])
info = plistlib.loads((bundle / "Contents/Info.plist").read_bytes())
assert info["CFBundleShortVersionString"] == "3.0.0"
assert info["CFBundleName"] == "FarmPilot"
checked = []

def verify_slice(data):
    endian = "<" if data[:4] in (bytes.fromhex("cffaedfe"), bytes.fromhex("cefaedfe")) else ">"
    count = struct.unpack_from(endian + "I", data, 16)[0]
    position = 32 if data[:4] in (bytes.fromhex("cffaedfe"), bytes.fromhex("feedfacf")) else 28
    signature = None
    for _ in range(count):
        command, size = struct.unpack_from(endian + "II", data, position)
        if command == 0x1D:
            signature = struct.unpack_from(endian + "II", data, position + 8)
        position += size
    assert signature, "Mach-O has no embedded code signature"
    start, length = signature
    magic, total, slots = struct.unpack_from(">III", data, start)
    assert magic == 0xFADE0CC0 and total <= length
    directories = []
    for index in range(slots):
        slot, offset = struct.unpack_from(">II", data, start + 12 + index * 8)
        base = start + offset
        magic, size = struct.unpack_from(">II", data, base)
        if magic != 0xFADE0C02:
            continue
        version, flags, hash_offset, identity, special, pages, limit = struct.unpack_from(">IIIIIII", data, base + 8)
        hash_size, hash_type, platform, page = struct.unpack_from("BBBB", data, base + 36)
        algorithm = {1: "sha1", 2: "sha256", 3: "sha256", 4: "sha384"}[hash_type]
        assert limit <= start and flags & 2, "Expected an ad hoc development signature"
        for index in range(pages):
            content = data[index * (1 << page):min((index + 1) * (1 << page), limit)]
            actual = hashlib.new(algorithm, content).digest()[:hash_size]
            expected = data[base + hash_offset + index * hash_size:base + hash_offset + (index + 1) * hash_size]
            assert actual == expected, "Code page hash mismatch"
        directories.append({"algorithm": algorithm, "pages": pages, "adHoc": True})
    assert directories
    return directories

for path in sorted(bundle.rglob("*")):
    if path.is_symlink() or not path.is_file():
        continue
    with path.open("rb") as stream:
        magic = stream.read(4)
    if magic not in [bytes.fromhex(value) for value in ("cffaedfe", "cefaedfe", "feedface", "feedfacf", "cafebabe", "cafebabf")]:
        continue
    data = path.read_bytes()
    if magic in (bytes.fromhex("cafebabe"), bytes.fromhex("cafebabf")):
        count = struct.unpack_from(">I", data, 4)[0]
        is64 = magic == bytes.fromhex("cafebabf")
        for index in range(count):
            offset, size = struct.unpack_from(">QQ" if is64 else ">II", data, 8 + index * (32 if is64 else 20) + 8)
            checked.append({"path": str(path.relative_to(bundle)), "slice": index, "directories": verify_slice(data[offset:offset + size])})
    else:
        checked.append({"path": str(path.relative_to(bundle)), "directories": verify_slice(data)})
assert checked
print(json.dumps({"status": "passed", "version": info["CFBundleShortVersionString"], "MachOFiles": len(checked), "codeDirectories": checked, "AppleTrustVerification": "pending", "nativeLaunch": "pending"}))
