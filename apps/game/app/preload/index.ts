import { contextBridge } from 'electron';
contextBridge.exposeInMainWorld('gameAPI', {
  // later: drawNumber, setPhase, etc.
});