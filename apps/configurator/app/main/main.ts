import { app, BrowserWindow, ipcMain } from 'electron';
import { createConfiguratorWindow, createHostWindow, createMainDisplayWindow, createNumbersGridWindow } from './windows';
import { IPC_INVOKE, IPC_SEND, Phase } from '../../shared/ipc-channels';
import { loadConfig, saveConfig, loadSession, saveSession } from './persistence';

const DEV_URL = 'http://localhost:5173';

let wins: {
  configurator?: BrowserWindow;
  host?: BrowserWindow;
  main?: BrowserWindow;
  grid?: BrowserWindow;
} = {};

async function createAllWindows() {
  wins.configurator = createConfiguratorWindow(DEV_URL);
  wins.host          = createHostWindow(DEV_URL);
  wins.main          = createMainDisplayWindow(DEV_URL);
  wins.grid          = createNumbersGridWindow(DEV_URL);
}

app.whenReady().then(async () => {
  await createAllWindows();

  app.on('activate', () => {
    if (BrowserWindow.getAllWindows().length === 0) createAllWindows();
  });
});

app.on('window-all-closed', () => {
  if (process.platform !== 'darwin') app.quit();
});

/* ---------------- IPC skeleton ---------------- */

// Change phase
ipcMain.handle(IPC_INVOKE.FLOW_SET_PHASE, async (_e, phase: Phase) => {
  // TODO: update session + broadcast
  wins.configurator?.webContents.send(IPC_SEND.PHASE_CHANGED, phase);
  wins.host?.webContents.send(IPC_SEND.PHASE_CHANGED, phase);
  wins.main?.webContents.send(IPC_SEND.PHASE_CHANGED, phase);
  wins.grid?.webContents.send(IPC_SEND.PHASE_CHANGED, phase);
});

// Request to draw a number
ipcMain.handle(IPC_INVOKE.DRAW_REQUEST, async (_e) => {
  // TODO: RNG logic, persist, broadcast
  const drawn = Math.floor(Math.random() * 75) + 1; // placeholder
  wins.host?.webContents.send(IPC_SEND.DRAW_NEW_NUMBER, drawn);
  wins.main?.webContents.send(IPC_SEND.DRAW_NEW_NUMBER, drawn);
  wins.grid?.webContents.send(IPC_SEND.DRAW_NEW_NUMBER, drawn);
  return drawn;
});

// Config load
ipcMain.handle(IPC_INVOKE.CONFIG_LOAD_PLAN, async (_e, cfg) => {
  await saveConfig(cfg);
  const current = await loadConfig();
  return current;
});

// Theme set
ipcMain.handle(IPC_INVOKE.THEME_SET, async (_e, themeId: string) => {
  // You might load + patch config here then persist
  const s = await loadSession();
  const patched = { ...(s ?? {}), activeThemeId: themeId };
  // @ts-ignore
  await saveSession(patched);
  wins.configurator?.webContents.send(IPC_SEND.STATE_PATCH, { activeThemeId: themeId });
  wins.main?.webContents.send(IPC_SEND.STATE_PATCH, { activeThemeId: themeId });
  wins.grid?.webContents.send(IPC_SEND.STATE_PATCH, { activeThemeId: themeId });
});
