'use strict';
const fs=require('node:fs/promises');const path=require('node:path');
// Never recursively erase the installation folder or the user's app data.
module.exports=async context=>{
 if(context.electronPlatformName!=='win32')return;
 const files=[],directories=[];
 async function walk(root,prefix=''){for(const e of await fs.readdir(root,{withFileTypes:true})){const rel=path.join(prefix,e.name);if(e.isDirectory()){directories.push(rel);await walk(path.join(root,e.name),rel);}else files.push(rel);}}
 await walk(context.appOutDir);
 const quote=value=>value.replaceAll('\\','/').replaceAll('$','$$').replaceAll('"','$\\"').replaceAll('/','\\');
 const lines=['; Generated from the actual packaged payload. Only app files are deleted.',...files.sort().map(f=>`Delete "$INSTDIR\\${quote(f)}"`),...directories.sort((a,b)=>b.split(path.sep).length-a.split(path.sep).length).map(d=>`RMDir "$INSTDIR\\${quote(d)}"`)];
 await fs.writeFile(path.join(__dirname,'assets/uninstall-files.nsh'),lines.join('\n')+'\n');
};
