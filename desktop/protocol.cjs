'use strict';
const fs = require('node:fs');
const path = require('node:path');
const { Readable } = require('node:stream');
const ORIGIN = 'noor://app';
const CSP = ["default-src 'self'", "script-src 'self' 'wasm-unsafe-eval'", "style-src 'self' 'unsafe-inline'", "img-src 'self' data: blob:", "font-src 'self'", "connect-src 'self'", "worker-src 'self' blob:", "object-src 'none'", "frame-src 'none'", "base-uri 'none'", "form-action 'none'"].join('; ');
const TYPES = {'.html':'text/html; charset=utf-8','.js':'text/javascript; charset=utf-8','.mjs':'text/javascript; charset=utf-8','.css':'text/css; charset=utf-8','.json':'application/json; charset=utf-8','.wasm':'application/wasm','.onnx':'application/octet-stream','.txt':'text/plain; charset=utf-8','.svg':'image/svg+xml','.png':'image/png','.jpg':'image/jpeg','.jpeg':'image/jpeg','.ico':'image/x-icon','.woff2':'font/woff2','.webmanifest':'application/manifest+json'};
function allowedPath(p) {
  return ['/offline/','/runtime/','/models/','/translation/'].some(prefix=>p.startsWith(prefix)) || ['/evaluation.json','/offline-manifest.json','/farm-illustration.jpg','/favicon.ico','/favicon.svg','/icon.png','/icon-192.png','/icon-512.png','/manifest.webmanifest'].includes(p);
}
function safeAssetPath(rawUrl, root) {
  // Inspect the raw path before URL parsing normalizes dot segments.
  if(typeof rawUrl!=='string'||!rawUrl.startsWith(`${ORIGIN}/`))return null;
  const rawPath=rawUrl.slice(ORIGIN.length).split(/[?#]/,1)[0]; let p;
  try{p=decodeURIComponent(rawPath);}catch{return null;}
  if(p.includes('\0')||p.includes('\\')||p.split('/').some(s=>s==='.'||s==='..'))return null;
  let u;try{u=new URL(rawUrl);}catch{return null;}
  if(u.protocol!=='noor:'||u.hostname!=='app'||u.port||u.username||u.password)return null;
  if(p==='/')p='/offline/index.html';if(!allowedPath(p))return null;
  const absolute=path.resolve(root,`.${p}`),relative=path.relative(root,absolute);
  if(relative.startsWith('..')||path.isAbsolute(relative))return null;
  return absolute;
}
function headersFor(filename){return {'Content-Type':TYPES[path.extname(filename).toLowerCase()]||'application/octet-stream','Content-Security-Policy':CSP,'X-Content-Type-Options':'nosniff','Cross-Origin-Opener-Policy':'same-origin','Cross-Origin-Embedder-Policy':'require-corp','Cross-Origin-Resource-Policy':'same-origin','Cache-Control':'no-store'};}
function createAssetHandler(resourceRoot){
  const root=fs.realpathSync(resourceRoot);
  return async function handle(request){
    if(!['GET','HEAD'].includes(request.method))return new Response('Method not allowed',{status:405});
    const filename=safeAssetPath(request.url,root);if(!filename)return new Response('Forbidden',{status:403});
    try{
      const real=await fs.promises.realpath(filename),relative=path.relative(root,real);
      if(relative.startsWith('..')||path.isAbsolute(relative))return new Response('Forbidden',{status:403});
      const stat=await fs.promises.stat(real);if(!stat.isFile())return new Response('Not found',{status:404});
      const headers={...headersFor(real),'Content-Length':String(stat.size)};
      const body=request.method==='HEAD'?null:Readable.toWeb(fs.createReadStream(real));
      return new Response(body,{status:200,headers});
    }catch(error){if(['ENOENT','ENOTDIR'].includes(error.code))return new Response('Not found',{status:404});return new Response('Asset unavailable',{status:500});}
  };
}
module.exports={ORIGIN,CSP,safeAssetPath,createAssetHandler};
