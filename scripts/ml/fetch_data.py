"""Fetch official sources, retain provenance and fixed benchmark subsets."""
import argparse, hashlib, json, tarfile, urllib.request
from pathlib import Path
import pyarrow.parquet as pq

def main():
    p=argparse.ArgumentParser();p.add_argument('--output',required=True);a=p.parse_args();out=Path(a.output);out.mkdir(parents=True,exist_ok=True);sources=[]
    def fetch(url,path):
        path.parent.mkdir(parents=True,exist_ok=True)
        if not path.exists():
            req=urllib.request.Request(url,headers={'User-Agent':'FarmPilot-hackathon/3.0 (dataset provenance; research prototype)'})
            path.write_bytes(urllib.request.urlopen(req,timeout=90).read())
        return {'url':url,'bytes':path.stat().st_size,'sha256':hashlib.sha256(path.read_bytes()).hexdigest()}
    archive=out/'massive-1.1.tar.gz';sources.append({'name':'MASSIVE 1.1','license':'CC-BY-4.0','role':'translation fine-tuning and partition-preserving evaluation',**fetch('https://amazon-massive-nlu-dataset.s3.amazonaws.com/amazon-massive-dataset-1.1.tar.gz',archive)})
    with tarfile.open(archive) as tar:
        for locale in ['en-US','sw-KE','fr-FR','es-ES']:
            member=tar.getmember('1.1/data/'+locale+'.jsonl');(out/(locale+'.jsonl')).write_bytes(tar.extractfile(member).read())
    archive=out/'flores200.tar.gz';source=fetch('https://dl.fbaipublicfiles.com/nllb/flores200_dataset.tar.gz',archive)
    if source['sha256'] != 'b8b0b76783024b85797e5cc75064eb83fc5288b41e9654dabc7be6ae944011f6':raise ValueError('FLORES archive changed; review before updating the benchmark')
    sources.append({'name':'FLORES-200 original archive','license':'CC-BY-SA-4.0','role':'evaluation only; no gradient updates or model selection',**source})
    parallel={}
    with tarfile.open(archive) as tar:
        for lang,code in {'en':'eng_Latn','sw':'swh_Latn','fr':'fra_Latn','es':'spa_Latn'}.items():
            member=next(m for m in tar.getmembers() if m.name.endswith('/devtest/'+code+'.devtest'))
            parallel[lang]=tar.extractfile(member).read().decode().splitlines()
    examples=[{'id':i+1,**{lang:lines[i] for lang,lines in parallel.items()}} for i in range(64)]
    (out/'flores-evaluation.json').write_text(json.dumps(examples,ensure_ascii=False,indent=2))
    for indicator in ['IT.NET.USER.ZS','ST.INT.ARVL','ST.INT.RCPT.CD']:
        path=out/(indicator+'.json');sources.append({'name':'World Bank WDI '+indicator,'license':'CC-BY-4.0 (indicator-specific metadata applies)','role':'Kenya scenario context only; not farm-level facts or model training',**fetch(f'https://api.worldbank.org/v2/country/KEN/indicator/{indicator}?date=2000:2025&format=json&per_page=100',path)})
    (out/'source-manifest.json').write_text(json.dumps(sources,indent=2));print(json.dumps({'sources':len(sources),'output':str(out)}))

if __name__=='__main__':main()
