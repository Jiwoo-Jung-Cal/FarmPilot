import {build} from 'vite';
import react from '@vitejs/plugin-react';
import {fileURLToPath} from 'node:url';
import {readFile,writeFile,readdir,stat,cp} from 'node:fs/promises';
import {join} from 'node:path';
import {createHash} from 'node:crypto';
const root=fileURLToPath(new URL('../',import.meta.url));
await build({configFile:false,root,base:'/offline/',publicDir:false,plugins:[react()],resolve:{alias:{'@':root}},define:{'process.env.NODE_ENV':JSON.stringify('production')},build:{outDir:join(root,'public/offline'),emptyOutDir:true,lib:{entry:join(root,'app/offline-entry.tsx'),formats:['es'],fileName:'app',cssFileName:'app'},rollupOptions:{output:{inlineDynamicImports:true}},minify:true}});
await writeFile(join(root,'public/offline/index.html'),`<!doctype html><html lang="en"><head><meta charset="utf-8"><meta name="viewport" content="width=device-width,initial-scale=1,viewport-fit=cover"><meta name="theme-color" content="#153b37"><title>FarmPilot · Offline tourism workspace</title><link rel="icon" href="/favicon.svg"><link rel="manifest" href="/manifest.webmanifest"><link rel="stylesheet" href="/offline/app.css"></head><body><div id="root"></div><script type="module" src="/offline/app.js"></script></body></html>`);
async function walk(dir,prefix=''){let result=[];for(const e of await readdir(dir,{withFileTypes:true})){const rel=join(prefix,e.name);if(e.isDirectory())result.push(...await walk(join(dir,e.name),rel));else result.push(rel);}return result;}
const paths=['favicon.svg','icon-192.png','icon-512.png','manifest.webmanifest','evaluation.json','farm-illustration.jpg','translation/worker.js','translation/archive.js','translation/manifest.json',...await walk(join(root,'public/offline'),'offline'),...await walk(join(root,'public/models'),'models'),...await walk(join(root,'public/runtime'),'runtime')];
const files=[];for(const path of paths){const data=await readFile(join(root,'public',path));files.push({url:`/${path.replaceAll('\\','/')}`,profile:/^(models|runtime)\//.test(path)&&path!=='runtime/transformers.web.min.js'?'full':'core',bytes:data.byteLength,sha256:createHash('sha256').update(data).digest('hex')});}
const manifest={version:1,createdAt:new Date().toISOString(),coreBytes:files.filter(f=>f.profile==='core').reduce((s,f)=>s+f.bytes,0),totalBytes:files.reduce((s,f)=>s+f.bytes,0),files};await writeFile(join(root,'public/offline-manifest.json'),JSON.stringify(manifest,null,2));
// Normal builds retain their Worker. The standalone app also supports an ordinary
// localhost web server and needs no server runtime after an offline installation.
try{if((await stat(join(root,'dist/client'))).isDirectory()){for(const rel of ['offline','runtime','models','translation','sw.js','offline-manifest.json','evaluation.json','farm-illustration.jpg','manifest.webmanifest','favicon.svg','icon-192.png','icon-512.png'])await cp(join(root,'public',rel),join(root,'dist/client',rel),{recursive:true});}}catch{}
console.log(JSON.stringify({offlineFiles:files.length,totalBytes:manifest.totalBytes}));
