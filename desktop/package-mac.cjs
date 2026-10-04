'use strict';
// Optional Linux development DMG build. Native macOS builds use dist:mac.
const fs=require('node:fs/promises'),path=require('node:path');
const {spawnSync}=require('node:child_process');const {packager}=require('@electron/packager');
async function normalizeBundleModes(dir){
 for(const entry of await fs.readdir(dir,{withFileTypes:true})){
  const file=path.join(dir,entry.name);
  if(entry.isSymbolicLink())continue;
  if(entry.isDirectory()){await fs.chmod(file,0o755);await normalizeBundleModes(file);}
  else if(entry.isFile()){
   const handle=await fs.open(file,'r');const head=Buffer.alloc(4);try{await handle.read(head,0,4,0);}finally{await handle.close();}
   const macho=['cffaedfe','cefaedfe','feedface','feedfacf','cafebabe','bebafeca','cafebabf','bfbafeca'].includes(head.toString('hex'));
   await fs.chmod(file,macho?0o755:0o644);
  }
 }
}
async function main(){
 const arch=process.argv[2]||'arm64';if(!['arm64','x64'].includes(arch))throw new Error('Use arm64 or x64.');
 const signingTool=process.env.NOOR_RCODESIGN,imageTool=process.env.NOOR_APFS;
 if(!signingTool||!imageTool)throw new Error('Set NOOR_RCODESIGN and NOOR_APFS to verified local tools.');
 const root=path.resolve(__dirname,'..'),output=path.join(root,'release'),cache=path.join(__dirname,'.cache');
 const assets=path.join(cache,`resources-${arch}`,'fieldnotes');
 await fs.mkdir(output,{recursive:true});await fs.rm(assets,{recursive:true,force:true});await fs.cp(path.join(root,'public'),assets,{recursive:true});
 const [parent]=await packager({dir:__dirname,out:path.join(cache,'mac'),name:'FarmPilot',executableName:'FarmPilot',platform:'darwin',arch,electronVersion:require('./package.json').devDependencies.electron,appVersion:require('./package.json').version,appBundleId:'org.noorfieldnotes.desktop',icon:path.join(__dirname,'assets/icon.icns'),asar:true,overwrite:true,prune:true,ignore:[/^\/(?:\.cache|node_modules|assets)(?:\/|$)/,/^\/.*\.log$/,/^\/test-protocol\.cjs$/,/^\/package-mac\.cjs$/,/^\/installer-hook\.cjs$/,/^\/electron-builder\.yml$/],extraResource:[assets],extendInfo:{LSApplicationCategoryType:'public.app-category.business'}});
 const bundle=path.join(parent,'FarmPilot.app');
 const run=(file,args)=>{const r=spawnSync(file,args,{stdio:'inherit'});if(r.error)throw r.error;if(r.status!==0)throw new Error(`${path.basename(file)} exited ${r.status}`);};
 run(signingTool,['sign','--timestamp-url','none','--entitlements-xml-file',`main:${path.join(__dirname,'assets/entitlements.plist')}`,bundle]);
 // Cross-platform signing can replace an executable with a 0600 temporary
 // file. Restore standard app permissions before creating the disk image.
 // Permission changes do not change the sealed file bytes.
 await normalizeBundleModes(bundle);
 const stage=path.join(cache,`dmg-${arch}`);await fs.rm(stage,{recursive:true,force:true});await fs.mkdir(stage,{recursive:true});
 await fs.cp(bundle,path.join(stage,'FarmPilot.app'),{recursive:true,dereference:false,verbatimSymlinks:true});
 await fs.rm(path.join(stage,'Applications'),{force:true});await fs.symlink('/Applications',path.join(stage,'Applications'));
 await fs.writeFile(path.join(stage,'Installation.txt'),`FarmPilot 3.0.0 — ${arch==='arm64'?'Apple Silicon':'Intel'} Mac\n\nDrag FarmPilot.app to Applications.\n\nThis development build is ad hoc signed and is not notarized. It has no Apple Developer ID certificate. Your Mac may block it; use your normal process for evaluating development software. This project does not change OS security settings.\n\nAll app and AI assets are included. No account, server or API key is needed. The workspace stays in this computer's app storage. Visitor requests here are local demonstrations, not internet bookings. Export a JSON backup before removing or replacing the app.\n`);
 const image=path.join(output,`FarmPilot-3.0.0-mac-${arch}.dmg`);
 run(imageTool,['pack',stage,image,'--fs','hfs+','--volname','FarmPilot','--compression','zlib','--strict']);console.log(`Created ${image}`);
}
main().catch(e=>{console.error(e.message);process.exitCode=1;});
