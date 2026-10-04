"""Evaluate deployed floating-point checkpoints on a fixed FLORES subset.
Browser quantization/tokenizer parity is checked separately and may reduce quality.
"""
import argparse,json,time
from pathlib import Path
import torch
from transformers import MarianMTModel,MarianTokenizer
from sacrebleu.metrics import CHRF
def main():
    p=argparse.ArgumentParser();p.add_argument('--models',required=True);p.add_argument('--data',required=True);p.add_argument('--output',required=True);a=p.parse_args();torch.set_num_threads(4);rows=json.loads(Path(a.data).read_text());results=[]
    for pair in ['en-sw','sw-en','en-fr','fr-en','en-es','es-en']:
        started=time.time();src,tgt=pair.split('-');path=Path(a.models)/pair/'checkpoint';tok=MarianTokenizer.from_pretrained(path);model=MarianMTModel.from_pretrained(path);model.eval();pred=[]
        with torch.no_grad():
            for i in range(0,len(rows),4):
                enc=tok([r[src] for r in rows[i:i+4]],return_tensors='pt',padding=True,truncation=False)
                pred.extend(tok.batch_decode(model.generate(**enc,max_new_tokens=256,num_beams=1),skip_special_tokens=True))
        results.append({'pair':pair,'count':len(rows),'chrf':CHRF().corpus_score(pred,[[r[tgt] for r in rows]]).score,'seconds':time.time()-started,'examples':[{'id':r['id'],'source':r[src],'reference':r[tgt],'output':v} for r,v in zip(rows,pred)]});print(pair,results[-1]['chrf'],flush=True)
    Path(a.output).write_text(json.dumps({'benchmark':'FLORES-200 devtest first 64 aligned IDs, evaluation only','runtime':'PyTorch fp32 greedy decoding; not a browser or full benchmark score','results':results},ensure_ascii=False,indent=2))
if __name__=='__main__':main()
