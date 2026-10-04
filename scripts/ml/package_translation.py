"""Split verified local language packs into static-host-compatible chunks."""
import argparse, hashlib, json
from pathlib import Path

LABELS={'en-sw':'English → Kiswahili','sw-en':'Kiswahili → English','en-fr':'English → Français','fr-en':'Français → English','en-es':'English → Español','es-en':'Español → English'}
def main():
    p=argparse.ArgumentParser();p.add_argument('--models',required=True);p.add_argument('--public',required=True);a=p.parse_args();root=Path(a.public);dest=root/'translation';(dest/'chunks').mkdir(parents=True,exist_ok=True);packs=[]
    for pair,label in LABELS.items():
        source=Path(a.models)/pair;report=json.loads((source/'training-report.json').read_text());files=[]
        for path in sorted((source/'pack').rglob('*')):
            if not path.is_file() or path.name not in ['config.json','generation_config.json','tokenizer_config.json','tokenizer.json','special_tokens_map.json','encoder_model_quantized.onnx','decoder_model_merged_quantized.onnx']:continue
            raw=path.read_bytes();chunks=[];relative=str(path.relative_to(source/'pack'))
            for i,start in enumerate(range(0,len(raw),8*1024*1024)):
                block=raw[start:start+8*1024*1024];sha=hashlib.sha256(block).hexdigest();name=f'{pair}-{hashlib.sha256(relative.encode()).hexdigest()[:10]}-{i}-{sha[:10]}.bin';(dest/'chunks'/name).write_bytes(block);chunks.append({'url':'/translation/chunks/'+name,'bytes':len(block),'sha256':sha})
            files.append({'path':relative,'bytes':len(raw),'sha256':hashlib.sha256(raw).hexdigest(),'chunks':chunks})
        fingerprint=hashlib.sha256(json.dumps(files,sort_keys=True).encode()).hexdigest()[:20];packs.append({'pair':pair,'label':label,'bytes':sum(f['bytes'] for f in files),'fingerprint':fingerprint,'checkpoint':report['deployedCheckpoint'],'baseModel':report['baseModel'],'revision':report['revision'],'files':files})
    runtime=[]
    for path in [root/'runtime/transformers.web.min.js',root/'runtime/ort-wasm-simd-threaded.jsep.mjs',root/'runtime/ort-wasm-simd-threaded.jsep.wasm']:
        raw=path.read_bytes();runtime.append({'url':'/'+str(path.relative_to(root)),'bytes':len(raw),'sha256':hashlib.sha256(raw).hexdigest()})
    (dest/'manifest.json').write_text(json.dumps({'version':1,'languages':{'en':'English','sw':'Kiswahili','fr':'Français','es':'Español'},'runtime':runtime,'packs':packs},ensure_ascii=False,indent=2));print(json.dumps({'packs':len(packs),'bytes':sum(p['bytes'] for p in packs)}))

if __name__=='__main__':main()
