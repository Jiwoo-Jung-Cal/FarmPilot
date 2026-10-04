'use strict';
const test=require('node:test'),assert=require('node:assert/strict');
const fs=require('node:fs'),os=require('node:os'),path=require('node:path');
const {safeAssetPath,createAssetHandler}=require('./protocol.cjs');
test('custom origin rejects traversal, credentials, other origins and non-assets',()=>{
 const root=path.resolve('public');
 for(const u of ['https://example.com/offline/index.html','noor://evil/offline/index.html','noor://app:80/offline/index.html','noor://user:password@app/offline/index.html','noor://app/offline/../package.json','noor://app/offline/%2e%2e/package.json','noor://app/offline/%2e%2e%2fpackage.json','noor://app/offline/%5c..%5csecret','noor://app/offline/%00','noor://app/offline/%zz','noor://app/package.json'])assert.equal(safeAssetPath(u,root),null,u);
 assert.equal(safeAssetPath('noor://app/',root),path.join(root,'offline/index.html'));
 assert.equal(safeAssetPath('noor://app/models/minilm/onnx/model_quantized.onnx?x=1',root),path.join(root,'models/minilm/onnx/model_quantized.onnx'));
});
test('streams exact bytes, correct WASM MIME and strict response headers',async t=>{
 const root=fs.mkdtempSync(path.join(os.tmpdir(),'noor-protocol-'));t.after(()=>fs.rmSync(root,{recursive:true,force:true}));fs.mkdirSync(path.join(root,'runtime'));
 const bytes=Buffer.from([0,97,115,109,1,0,0,0]);fs.writeFileSync(path.join(root,'runtime/model.wasm'),bytes);const handle=createAssetHandler(root);
 const r=await handle(new Request('noor://app/runtime/model.wasm'));assert.equal(r.status,200);assert.deepEqual(Buffer.from(await r.arrayBuffer()),bytes);assert.equal(r.headers.get('Content-Type'),'application/wasm');assert.equal(r.headers.get('Content-Length'),'8');assert.match(r.headers.get('Content-Security-Policy'),/connect-src 'self'/);assert.match(r.headers.get('Content-Security-Policy'),/wasm-unsafe-eval/);
 assert.equal((await (await handle(new Request('noor://app/runtime/model.wasm',{method:'HEAD'}))).arrayBuffer()).byteLength,0);
 assert.equal((await handle(new Request('noor://app/runtime/missing.wasm'))).status,404);assert.equal((await handle(new Request('noor://app/runtime/model.wasm',{method:'POST'}))).status,405);
});
test('does not follow symlinks outside the resource directory',async t=>{
 const parent=fs.mkdtempSync(path.join(os.tmpdir(),'noor-symlink-'));t.after(()=>fs.rmSync(parent,{recursive:true,force:true}));const root=path.join(parent,'public');fs.mkdirSync(path.join(root,'offline'),{recursive:true});fs.writeFileSync(path.join(parent,'secret.txt'),'outside');
 try{fs.symlinkSync(path.join(parent,'secret.txt'),path.join(root,'offline/escape.txt'));}catch(e){if(e.code==='EPERM')return t.skip('Windows account cannot create symlinks');throw e;}
 assert.equal((await createAssetHandler(root)(new Request('noor://app/offline/escape.txt'))).status,403);
});
