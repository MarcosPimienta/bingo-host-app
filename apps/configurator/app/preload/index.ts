import { contextBridge } from 'electron';

contextBridge.exposeInMainWorld('configAPI', {
  // later: validate/bundle, build game installer, etc.
});