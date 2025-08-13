import { contextBridge, ipcRenderer } from 'electron';
import { IPC_INVOKE, IPC_SEND } from '../../shared/ipc-channels';

contextBridge.exposeInMainWorld('bingo', {
  // invocations
  setPhase: (phase: string) => ipcRenderer.invoke(IPC_INVOKE.FLOW_SET_PHASE, phase),
  drawNumber: () => ipcRenderer.invoke(IPC_INVOKE.DRAW_REQUEST),
  loadPlan: (cfg: unknown) => ipcRenderer.invoke(IPC_INVOKE.CONFIG_LOAD_PLAN, cfg),
  setTheme: (themeId: string) => ipcRenderer.invoke(IPC_INVOKE.THEME_SET, themeId),

  // subscriptions
  onPhaseChanged: (fn: (p: string) => void) => ipcRenderer.on(IPC_SEND.PHASE_CHANGED, (_e, p) => fn(p)),
  onNewNumber: (fn: (n: number) => void) => ipcRenderer.on(IPC_SEND.DRAW_NEW_NUMBER, (_e, n) => fn(n)),
  onStatePatch: (fn: (patch: Record<string, unknown>) => void) =>
    ipcRenderer.on(IPC_SEND.STATE_PATCH, (_e, patch) => fn(patch)),
});