"""Restore only known, hash-verified model chunks from release ZIPs."""
import hashlib
import json
import sys
import zipfile
from pathlib import Path

root = Path(__file__).resolve().parents[1]
catalog = json.loads((root / 'public/translation/manifest.json').read_text())
expected = {}
for pack in catalog['packs']:
    for item in pack['files']:
        for chunk in item['chunks']:
            expected['FarmPilot/public/' + chunk['url'].lstrip('/')] = chunk
found = set()
for archive in sorted(Path(sys.argv[1]).glob('FarmPilot_Models_*.zip')):
    with zipfile.ZipFile(archive) as bundle:
        for entry in bundle.infolist():
            if entry.filename not in expected:
                continue
            item = expected[entry.filename]
            if entry.file_size != item['bytes'] or entry.file_size > 32 * 1048576:
                raise ValueError('Invalid model file size')
            data = bundle.read(entry)
            if hashlib.sha256(data).hexdigest() != item['sha256']:
                raise ValueError('Model checksum failed')
            target = root / entry.filename.removeprefix('FarmPilot/')
            target.parent.mkdir(parents=True, exist_ok=True)
            target.write_bytes(data)
            found.add(entry.filename)
if found != set(expected):
    raise ValueError(f'Missing {len(set(expected) - found)} model chunks; attach all three language ZIPs to the release.')
print(f'Restored and verified {len(found)} model chunks.')
