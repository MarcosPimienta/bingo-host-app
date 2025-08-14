import { app, BrowserWindow, screen } from 'electron';
import { join } from 'path';

const isDev = !app.isPackaged;
const DEV_URL = 'http://localhost:5174';

function load(win: BrowserWindow, page: string) {
  if (isDev) win.loadURL(`${DEV_URL}/entries/${page}.html`);
  else win.loadFile(join(__dirname, `../../renderer/${page}.html`));
}

function createWindows() {
  // Host (windowed)
  const host = new BrowserWindow({
    title: 'Host Controller',
    width: 1400, height: 900, show: false, autoHideMenuBar: true,
    webPreferences: { contextIsolation: true, nodeIntegration: false, preload: join(__dirname, '../preload/index.js') }
  });
  load(host, 'host-controller'); host.once('ready-to-show', () => host.show());

  // Main Display (fullscreen frameless)
  const primary = screen.getPrimaryDisplay();
  const main = new BrowserWindow({
    title: 'Main Display', x: primary.bounds.x, y: primary.bounds.y,
    width: primary.bounds.width, height: primary.bounds.height,
    frame: false, fullscreen: true, backgroundColor: '#000', show: false,
    webPreferences: { contextIsolation: true, nodeIntegration: false, preload: join(__dirname, '../preload/index.js') }
  });
  load(main, 'main-display'); main.once('ready-to-show', () => main.show());

  // Numbers Grid (fullscreen frameless; use 2nd display if present)
  const all = screen.getAllDisplays(); const target = all[1] ?? primary;
  const grid = new BrowserWindow({
    title: 'Numbers Grid', x: target.bounds.x, y: target.bounds.y,
    width: target.bounds.width, height: target.bounds.height,
    frame: false, fullscreen: true, backgroundColor: '#000', show: false,
    webPreferences: { contextIsolation: true, nodeIntegration: false, preload: join(__dirname, '../preload/index.js') }
  });
  load(grid, 'numbers-grid'); grid.once('ready-to-show', () => grid.show());
}

app.whenReady().then(createWindows);
app.on('window-all-closed', () => { if (process.platform !== 'darwin') app.quit(); });
app.on('activate', () => { if (BrowserWindow.getAllWindows().length === 0) createWindows(); });