import {build} from 'vite';
await build({configFile:false,publicDir:false,build:{ssr:'scripts/evaluate.ts',outDir:'.checks',emptyOutDir:true,rollupOptions:{output:{entryFileNames:'evaluate.mjs'}}}});
await import('../.checks/evaluate.mjs');
