'use strict';
const {contextBridge}=require('electron');
// No filesystem, IPC or Node API is exposed to the renderer.
contextBridge.exposeInMainWorld('noorDesktop',Object.freeze({offlineIncluded:true}));
