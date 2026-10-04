"""Reproducible, bounded Swahili adaptation; never trains on MASSIVE test data.

Run with the pinned dependencies in requirements.txt and --data-dir containing
official MASSIVE 1.1 JSONL files. Optional packs are exported and quantized locally.
"""
import argparse, hashlib, json, random, time
from pathlib import Path
import torch
from transformers import MarianMTModel, MarianTokenizer
from optimum.exporters.onnx import main_export
from onnxruntime.quantization import quantize_dynamic, QuantType
from sacrebleu.metrics import CHRF
from marian_tokenizer import generate_tokenizer_json
from quantize_pack import quantize

MODELS = {
    "en-fr": ("Helsinki-NLP/opus-mt-en-fr", "dd7f6540a7a48a7f4db59e5c0b9c42c8eea67f18"),
    "fr-en": ("Helsinki-NLP/opus-mt-fr-en", "c4aed37b318c763fd177aa449b44e3b783cc6c02"),
    "en-es": ("Helsinki-NLP/opus-mt-en-es", "5bc4493d463cf000c1f0b50f8d56886a392ed4ab"),
    "es-en": ("Helsinki-NLP/opus-mt-es-en", "c96e2c5399ebfae4fc43d9669556b9afa74bb69d"),
    "en-sw": ("Helsinki-NLP/opus-mt-en-sw", "28780399d37e1161afc94577a717d7fcfa54fecc"),
    "sw-en": ("Helsinki-NLP/opus-mt-swc-en", "fd30f0575e2037990cb26de0774c9d000908551b"),
}
LOCALES = {"en":"en-US", "sw":"sw-KE", "fr":"fr-FR", "es":"es-ES"}

def main():
    p=argparse.ArgumentParser();p.add_argument('--data-dir',required=True);p.add_argument('--output',required=True);p.add_argument('--pair',choices=MODELS,required=True);p.add_argument('--steps',type=int,default=256);a=p.parse_args()
    torch.set_num_threads(4);torch.manual_seed(31);random.seed(31)
    src,tgt=a.pair.split('-'); data={}
    for lang,locale in LOCALES.items():
        rows=[json.loads(x) for x in (Path(a.data_dir)/(locale+'.jsonl')).read_text().splitlines()]
        data[lang]={r['id']:r for r in rows}
    aligned=[(data[src][k]['utt'],data[tgt][k]['utt'],r['partition'],k) for k,r in data[src].items() if k in data[tgt] and data[tgt][k]['partition']==r['partition']]
    train=[r for r in aligned if r[2]=='train' and max(len(r[0]),len(r[1]))<=220]
    validation=[r for r in aligned if r[2]=='dev' and max(len(r[0]),len(r[1]))<=220]
    test=[r for r in aligned if r[2]=='test' and max(len(r[0]),len(r[1]))<=220]
    random.shuffle(train);random.shuffle(validation);random.shuffle(test);train=train[:a.steps*4];validation=validation[:64];test=test[:128]
    out=Path(a.output)/a.pair;out.mkdir(parents=True,exist_ok=True)
    mid,rev=MODELS[a.pair];tok=MarianTokenizer.from_pretrained(mid,revision=rev);model=MarianMTModel.from_pretrained(mid,revision=rev)
    def evaluate(rows):
        model.eval();pred=[]
        with torch.no_grad():
            for i in range(0,len(rows),8):
                enc=tok([r[0] for r in rows[i:i+8]],return_tensors='pt',padding=True,truncation=True,max_length=80)
                pred.extend(tok.batch_decode(model.generate(**enc,max_new_tokens=80,num_beams=1),skip_special_tokens=True))
        return {'chrf':CHRF().corpus_score(pred,[[r[1] for r in rows]]).score,'examples':[{'source':r[0],'reference':r[1],'output':v} for r,v in zip(rows,pred)]}
    started=time.time();baseline=evaluate(validation);print(json.dumps({'pair':a.pair,'baseline_chrf':baseline['chrf']}),flush=True)
    for name,param in model.named_parameters():param.requires_grad=('decoder.layers.5.' in name or 'decoder.layers.4.' in name)
    optimizer=torch.optim.AdamW([v for v in model.parameters() if v.requires_grad],lr=5e-5)
    losses=[];model.train()
    for i in range(a.steps):
        rows=train[i*4:(i+1)*4];enc=tok([r[0] for r in rows],text_target=[r[1] for r in rows],return_tensors='pt',padding=True,truncation=True,max_length=80)
        enc['labels'][enc['labels']==tok.pad_token_id]=-100
        optimizer.zero_grad();loss=model(**enc).loss;loss.backward();torch.nn.utils.clip_grad_norm_(model.parameters(),1.0);optimizer.step();losses.append(loss.item())
        if i%8==0:print(json.dumps({'pair':a.pair,'step':i+1,'loss':loss.item()}),flush=True)
    adapted=evaluate(validation);chosen='adapted' if adapted['chrf']>=baseline['chrf'] else 'pretrained'
    # Do not deploy a checkpoint that regressed on this small validation sample.
    if chosen=='pretrained':model=MarianMTModel.from_pretrained(mid,revision=rev)
    checkpoint=out/'checkpoint';model.save_pretrained(checkpoint);tok.save_pretrained(checkpoint)
    report={'pair':a.pair,'baseModel':mid,'revision':rev,'dialectGap':src=='sw','steps':a.steps,'batchSize':4,'learningRate':5e-5,'seed':31,'trainCount':len(train),'validationCount':len(validation),'testCount':len(test),'trainIds':[r[3] for r in train],'validationIds':[r[3] for r in validation],'testIds':[r[3] for r in test], 'test':evaluate(test),'trainedParameters':sum(v.numel() for v in model.parameters() if v.requires_grad),'losses':losses,'baseline':baseline,'adapted':adapted,'deployedCheckpoint':chosen,'seconds':time.time()-started,'limitations':'Small generic voice-assistant sample; not independent tourism or native-speaker validation. sw-en base is Congo Swahili; adaptation does not establish dialect equivalence.'}
    (out/'training-report.json').write_text(json.dumps(report,ensure_ascii=False,indent=2))
    exported=out/'export';main_export(str(checkpoint),output=str(exported),task='text2text-generation-with-past',opset=17,do_validation=False,no_post_process=False)
    pack=out/'pack';(pack/'onnx').mkdir(parents=True,exist_ok=True)
    for name in ['config.json','generation_config.json','tokenizer_config.json']:
        if (checkpoint/name).exists():(pack/name).write_bytes((checkpoint/name).read_bytes())
    tc=json.loads((pack/'tokenizer_config.json').read_text());tc['tokenizer_class']='MarianTokenizer';tc['eos_token']='</s>';tc['unk_token']='<unk>';tc['pad_token']='<pad>';(pack/'tokenizer_config.json').write_text(json.dumps(tc))
    (pack/'tokenizer.json').write_text(json.dumps(generate_tokenizer_json(str(checkpoint),tok),ensure_ascii=False))
    for name in ['encoder_model','decoder_model_merged']:
        quantize(exported/(name+'.onnx'),pack/'onnx'/(name+'_quantized.onnx'))
    print(json.dumps({'pair':a.pair,'deployedCheckpoint':chosen,'pack':str(pack)}),flush=True)

if __name__=='__main__':main()
