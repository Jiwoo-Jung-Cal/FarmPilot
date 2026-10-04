'use strict';
const {app,BrowserWindow,Menu,protocol,session}=require('electron');
const path=require('node:path');
const {ORIGIN,createAssetHandler}=require('./protocol.cjs');
// Keep the established profile so a rename preserves saved farm data.
app.setPath('userData',path.join(app.getPath('appData'),'Noor Fieldnotes'));
app.setName('FarmPilot');
protocol.registerSchemesAsPrivileged([{scheme:'noor',privileges:{standard:true,secure:true,supportFetchAPI:true,corsEnabled:true,stream:true}}]);
const singleInstance=app.requestSingleInstanceLock();let mainWindow;
if(!singleInstance)app.quit();
function createWindow(){
 mainWindow=new BrowserWindow({title:'FarmPilot',width:1280,height:860,minWidth:390,minHeight:600,backgroundColor:'#f8f8f3',show:false,icon:app.isPackaged?path.join(process.resourcesPath,'fieldnotes/icon-512.png'):path.resolve(__dirname,'../public/icon-512.png'),webPreferences:{preload:path.join(__dirname,'preload.cjs'),nodeIntegration:false,nodeIntegrationInWorker:false,contextIsolation:true,sandbox:true,webSecurity:true,webviewTag:false}});
 mainWindow.webContents.setWindowOpenHandler(()=>({action:'deny'}));
 mainWindow.webContents.on('will-navigate',event=>event.preventDefault());
 mainWindow.webContents.on('will-attach-webview',event=>event.preventDefault());
 mainWindow.once('ready-to-show',()=>mainWindow.show());
 mainWindow.on('closed',()=>{mainWindow=null;});mainWindow.loadURL(`${ORIGIN}/offline/index.html`);
}
if(singleInstance){
 app.on('second-instance',()=>{if(!mainWindow)return;if(mainWindow.isMinimized())mainWindow.restore();mainWindow.show();mainWindow.focus();});
 app.whenReady().then(()=>{
  const resources=app.isPackaged?path.join(process.resourcesPath,'fieldnotes'):path.resolve(__dirname,'../public');
  protocol.handle('noor',createAssetHandler(resources));const localSession=session.defaultSession;
  localSession.setPermissionRequestHandler((_contents,_permission,callback)=>callback(false));localSession.setPermissionCheckHandler(()=>false);
  localSession.webRequest.onBeforeRequest({urls:['http://*/*','https://*/*','ws://*/*','wss://*/*']},(_details,callback)=>callback({cancel:true}));
  localSession.on('will-download',(event,item,webContents)=>{if(!webContents||webContents!==mainWindow?.webContents||!item.getURL().startsWith(`blob:${ORIGIN}/`)){event.preventDefault();return;}item.setSaveDialogOptions({title:'Save your Fieldnotes file',defaultPath:path.basename(item.getFilename()||'FarmPilot-backup.json')});});
  Menu.setApplicationMenu(Menu.buildFromTemplate([...(process.platform==='darwin'?[{role:'appMenu'}]:[]),{label:'File',submenu:[{role:process.platform==='darwin'?'close':'quit'}]},{role:'editMenu'},{label:'View',submenu:[{role:'reload'},{type:'separator'},{role:'resetZoom'},{role:'zoomIn'},{role:'zoomOut'},{type:'separator'},{role:'togglefullscreen'}]},{role:'windowMenu'}]));
  createWindow();app.on('activate',()=>{if(!BrowserWindow.getAllWindows().length)createWindow();});
 }).catch(error=>{console.error('Unable to start Fieldnotes:',error.message);app.quit();});
 app.on('window-all-closed',()=>{if(process.platform!=='darwin')app.quit();});
}
