const META='noor-offline-v1';
const READY='/offline-ready.json';
self.addEventListener('install',event=>event.waitUntil(self.skipWaiting()));
self.addEventListener('activate',event=>event.waitUntil(self.clients.claim()));
async function activePackage(){const metadata=await caches.open(META);const ready=await metadata.match(READY);return ready?caches.open((await ready.json()).cacheName):null;}
self.addEventListener('message',event=>{
 if(event.data?.type!=='PREPARE_OFFLINE')return;
 const profile=event.data.profile==='full'?'full':'core',port=event.ports[0];
 event.waitUntil((async()=>{
  try{
   const response=await fetch('/offline-manifest.json',{cache:'no-store'});if(!response.ok)throw new Error('Offline package is not yet available.');
   const manifest=await response.json();if(!Array.isArray(manifest.files)||manifest.version!==1)throw new Error('Invalid offline package.');
   const files=manifest.files.filter(f=>profile==='full'||f.profile==='core');
   const packageHash=Array.from(new Uint8Array(await crypto.subtle.digest('SHA-256',new TextEncoder().encode(JSON.stringify(manifest))))).slice(0,10).map(x=>x.toString(16).padStart(2,'0')).join('');
   const name=`noor-package-${packageHash}-${profile}`;const cache=await caches.open(name);let done=0;
   // Interrupted or corrupt updates leave the previously selected package usable.
   for(const file of files){
    if(typeof file.url!=='string'||!file.url.startsWith('/')||file.url.startsWith('//'))throw new Error('Invalid package URL.');
    const result=await fetch(file.url,{cache:'reload'});if(!result.ok)throw new Error(`Could not save ${file.url}`);
    const bytes=await result.clone().arrayBuffer();if(bytes.byteLength!==file.bytes)throw new Error('An offline file is incomplete.');
    const digest=Array.from(new Uint8Array(await crypto.subtle.digest('SHA-256',bytes))).map(x=>x.toString(16).padStart(2,'0')).join('');if(digest!==file.sha256)throw new Error('An offline file did not match its manifest.');
    await cache.put(file.url,result);port?.postMessage({status:'progress',done:++done,total:files.length});
   }
   if(!await cache.match('/offline/index.html'))throw new Error('The offline app is missing.');
   const ready={cacheName:name,profile,bytes:files.reduce((n,f)=>n+f.bytes,0)};
   const metadata=await caches.open(META);await metadata.put(READY,new Response(JSON.stringify(ready),{headers:{'content-type':'application/json'}}));
   port?.postMessage({status:'ready',...ready});
   for(const key of await caches.keys())if(key.startsWith('noor-package-')&&key!==name)await caches.delete(key);
  }catch(error){port?.postMessage({status:'error',error:String(error?.message||error)});}
 })());
});
self.addEventListener('fetch',event=>{
 const url=new URL(event.request.url);if(url.origin!==self.location.origin||event.request.method!=='GET')return;
 if(event.request.mode==='navigate'&&(url.pathname==='/'||url.pathname==='/offline/index.html')){
  event.respondWith((async()=>{const cache=await activePackage();return await cache?.match('/offline/index.html')||fetch(event.request);})());return;
 }
 if(/^\/(offline\/|translation\/(?:worker\.js$|archive\.js$|manifest\.json$)|runtime\/|models\/|evaluation\.json$|farm-illustration\.jpg$|favicon\.svg$|icon-\d+\.png$|manifest\.webmanifest$)/.test(url.pathname))event.respondWith((async()=>{const cache=await activePackage();const saved=await cache?.match(url.pathname);if(saved)return saved;if(url.pathname.startsWith('/runtime/')){for(const key of await caches.keys()){if(!key.startsWith('farmpilot-translation-v1-'))continue;const pack=await caches.open(key);const entries=await pack.keys();if(!entries.some(r=>r.url.includes('/translation/ready/')))continue;const asset=await pack.match(url.pathname);if(asset)return asset;}}return fetch(event.request);})());
});
