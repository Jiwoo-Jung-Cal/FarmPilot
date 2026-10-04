"""Build sideloadable ZIPs from the verified model chunks already in this repo."""
import hashlib, json, zipfile
from pathlib import Path
root=Path(__file__).resolve().parents[1]
catalog=json.loads((root/'public/translation/manifest.json').read_text())
out=root/'language-packs';out.mkdir(exist_ok=True)
for name,language in [('Swahili','sw'),('French','fr'),('Spanish','es')]:
    files={f['url'] for f in catalog['runtime']}
    for pack in catalog['packs']:
        if pack['pair'] in [f'en-{language}',f'{language}-en']:
            for file in pack['files']:
                for chunk in file['chunks']:
                    path=root/'public'/chunk['url'].lstrip('/')
                    data=path.read_bytes()
                    if len(data)!=chunk['bytes'] or hashlib.sha256(data).hexdigest()!=chunk['sha256']:
                        raise ValueError(f'Corrupt model: {path.name}')
                    files.add(chunk['url'])
    target=out/f'FarmPilot_Models_{name}.zip'
    with zipfile.ZipFile(target,'w',zipfile.ZIP_DEFLATED,compresslevel=1) as archive:
        for url in sorted(files):
            archive.write(root/'public'/url.lstrip('/'),'FarmPilot/public/'+url.lstrip('/'))
    print(f'{target.name}: {target.stat().st_size} bytes',flush=True)
