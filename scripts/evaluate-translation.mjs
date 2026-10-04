import {readFile,writeFile} from 'node:fs/promises';
import {env,pipeline} from '@huggingface/transformers';
env.allowRemoteModels=false;env.localModelPath=process.env.FARMPILOT_MODEL_ROOT;
if(!env.localModelPath)throw new Error('Set FARMPILOT_MODEL_ROOT to the trained model directory.');
const flores=JSON.parse(await readFile('docs/training/flores-evaluation.json','utf8'));
const tourism=JSON.parse(await readFile('data/tourism-translation-tests.json','utf8')).prompts;
const results=[];
for(const pair of ['en-sw','sw-en','en-fr','fr-en','en-es','es-en']){
 const [source,target]=pair.split('-');const started=performance.now();const model=await pipeline('translation',pair+'/pack',{dtype:'q8',device:'cpu'});const records=[];
 for(const row of flores.slice(0,8))records.push({id:row.id,source:row[source],reference:row[target],output:(await model(row[source],{max_new_tokens:256,num_beams:1,do_sample:false}))[0].translation_text});
 const domain=[];if(source==='en')for(const input of tourism)domain.push({source:input,output:(await model(input,{max_new_tokens:256,num_beams:1,do_sample:false}))[0].translation_text});
 await model.dispose();results.push({pair,seconds:(performance.now()-started)/1000,flores:records,tourism:domain});console.log(pair+' completed');
 await writeFile('docs/training/quantized-results.json',JSON.stringify({runtime:'ONNX Runtime Node, q8, Transformers.js 3.8.1; not a phone/browser performance measurement',results},null,2));
}
