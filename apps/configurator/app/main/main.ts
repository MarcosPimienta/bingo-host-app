import { app, BrowserWindow } from 'electron';
import { join } from 'path';

const isDev = !app.isPackaged;
const DEV_URL = 'http://localhost:5173';

function createWindow() {
  const win = new BrowserWindow({
    title: 'Configurator',
    width: 1280,
    height: 900,
    autoHideMenuBar: true,
    webPreferences: {
      contextIsolation: true,
      nodeIntegration: false,
      preload: join(__dirname, '../preload/index.js')
    }
  });

  if (isDev) win.loadURL(`${DEV_URL}/entries/configurator.html`);
  else win.loadFile(join(__dirname, '../../renderer/configurator.html'));

  win.once('ready-to-show', () => win.show());
}

app.whenReady().then(createWindow);
app.on('window-all-closed', () => { if (process.platform !== 'darwin') app.quit(); });
app.on('activate', () => { if (BrowserWindow.getAllWindows().length === 0) createWindow(); });