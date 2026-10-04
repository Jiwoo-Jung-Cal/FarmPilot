import assert from 'node:assert/strict';
import vm from 'node:vm';
import {readFile,writeFile} from 'node:fs/promises';
import {webcrypto} from 'node:crypto';

// Executes the shipped service worker against real packaged bytes. Browser
// CacheStorage is emulated; this does not replace a real-phone airplane-mode test.
const buckets=new Map(),listeners=new Map(),requests=[];
let connected=true,corruptUrl=null,missingUrl=null;
const keyOf=x=>typeof x==='string'?new URL(x,'https://example.test').pathname:new URL(x.url).pathname;
const caches={
 async open(name){if(!buckets.has(name))buckets.set(name,new Map());const bucket=buckets.get(name);return {
  async match(key){return bucket.get(keyOf(key))?.clone();},
  async put(key,response){bucket.set(keyOf(key),response.clone());},
  async delete(key){return bucket.delete(keyOf(key));},
 };},
 async keys(){return [...buckets.keys()];},async delete(name){return buckets.delete(name);},
};
const self={location:{origin:'https://example.test'},clients:{claim:async()=>{}},skipWaiting:async()=>{},addEventListener:(type,handler)=>listeners.set(type,handler)};
const network=async input=>{
 const path=keyOf(input);requests.push(path);if(!connected)throw new Error('Network disabled');
 if(path===missingUrl)return new Response('',{status:503});
 const bytes=await readFile(`public${path}`);if(path===corruptUrl)bytes[0]^=1;
 return new Response(bytes);
};
vm.runInNewContext(await readFile('public/sw.js','utf8'),{self,caches,fetch:network,URL,Response,TextEncoder,crypto:webcrypto});
async function prepare(profile){const messages=[];let pending;listeners.get('message')({data:{type:'PREPARE_OFFLINE',profile},ports:[{postMessage:data=>messages.push(data)}],waitUntil:p=>pending=p});await pending;return messages.at(-1);}
async function resource(path,mode='cors',method='GET'){let pending;listeners.get('fetch')({request:{url:`https://example.test${path}`,mode,method},respondWith:p=>pending=p});return pending?await pending:null;}
const manifest=JSON.parse(await readFile('public/offline-manifest.json','utf8'));
const core=await prepare('core');assert.equal(core.status,'ready');assert.equal(core.bytes,manifest.coreBytes);assert(!requests.some(p=>p.startsWith('/models/')||(p.startsWith('/runtime/')&&p!=='/runtime/transformers.web.min.js')));
connected=false;assert.match(await (await resource('/','navigate')).text(),/FarmPilot/);assert((await resource('/offline/app.js')).ok);assert((await resource('/offline/app.css')).ok);assert((await resource('/translation/archive.js')).ok);assert((await resource('/runtime/transformers.web.min.js')).ok);assert.equal(await resource('/api/private'),null);assert.equal(await resource('/offline/app.js','cors','POST'),null);
connected=true;const full=await prepare('full');assert.equal(full.status,'ready');assert.equal(full.bytes,manifest.totalBytes);
connected=false;assert.equal((await (await resource('/models/minilm/onnx/model_quantized.onnx')).arrayBuffer()).byteLength,22_972_370);assert((await resource('/runtime/ort-wasm-simd-threaded.jsep.wasm')).ok);
connected=true;corruptUrl='/offline/app.js';const corrupt=await prepare('core');assert.equal(corrupt.status,'error');assert.match(corrupt.error,/manifest/);corruptUrl=null;
missingUrl='/offline/app.css';const interrupted=await prepare('core');assert.equal(interrupted.status,'error');missingUrl=null;
connected=false;assert.match(await (await resource('/','navigate')).text(),/FarmPilot/);assert((await resource('/models/minilm/onnx/model_quantized.onnx')).ok,'Failed update must retain selected full package');
const result={serviceWorker:'passed',coreBytes:manifest.coreBytes,fullBytes:manifest.totalBytes,checks:['core install excludes large models and WASM while retaining the ZIP importer and small translation module','full package integrity verified','root, app, styles and AI assets available without network','failed or corrupt update retains installed package','API and write requests excluded'],environment:'Node VM with CacheStorage simulation and actual packaged files; no real-phone validation',phoneAirplaneMode:'pending',nativeSwahiliReview:'pending'};
await writeFile('docs/offline-validation.json',JSON.stringify(result,null,2));console.log(JSON.stringify(result));
