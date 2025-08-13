import { BrowserWindow, screen, app } from 'electron';
import { join } from 'node:path';

export type WindowKeys = 'configurator' | 'host' | 'main' | 'grid';

export interface CreateWindowOpts {
  devServerURL?: string; // e.g. http://localhost:5173
}

const isDev = !app.isPackaged;
const RENDERER_DIR = join(__dirname, '../../renderer'); // when packaged

function pagePath(name: WindowKeys) {
  if (isDev) {
    // vite multipage entries
    const map: Record<WindowKeys, string> = {
      configurator: '/configurator.html',
      host: '/host-controller.html',
      main: '/main-display.html',
      grid: '/numbers-grid.html',
    };
    return map[name];
  } else {
    // built html lives in dist/renderer
    const map: Record<WindowKeys, string> = {
      configurator: 'configurator.html',
      host: 'host-controller.html',
      main: 'main-display.html',
      grid: 'numbers-grid.html',
    };
    return join(RENDERER_DIR, map[name]);
  }
}

export function createConfiguratorWindow(devURL?: string) {
  const win = new BrowserWindow({
    width: 1200,
    height: 800,
    show: false,
    webPreferences: {
      preload: join(__dirname, '../preload/index.js'),
      contextIsolation: true,
      nodeIntegration: false,
    },
  });
  if (isDev && devURL) win.loadURL(devURL + pagePath('configurator'));
  else win.loadFile(pagePath('configurator'));
  win.once('ready-to-show', () => win.show());
  return win;
}

export function createHostWindow(devURL?: string) {
  const win = new BrowserWindow({
    width: 1400,
    height: 900,
    show: false,
    webPreferences: {
      preload: join(__dirname, '../preload/index.js'),
      contextIsolation: true,
      nodeIntegration: false,
    },
  });
  if (isDev && devURL) win.loadURL(devURL + pagePath('host'));
  else win.loadFile(pagePath('host'));
  win.once('ready-to-show', () => win.show());
  return win;
}

export function createMainDisplayWindow(devURL?: string) {
  const primary = screen.getPrimaryDisplay();
  const win = new BrowserWindow({
    x: primary.bounds.x,
    y: primary.bounds.y,
    width: primary.bounds.width,
    height: primary.bounds.height,
    show: false,
    frame: false,
    fullscreen: true,
    backgroundColor: '#000000',
    webPreferences: {
      preload: join(__dirname, '../preload/index.js'),
      contextIsolation: true,
      nodeIntegration: false,
    },
  });
  if (isDev && devURL) win.loadURL(devURL + pagePath('main'));
  else win.loadFile(pagePath('main'));
  win.once('ready-to-show', () => win.show());
  return win;
}

export function createNumbersGridWindow(devURL?: string) {
  const all = screen.getAllDisplays();
  const target = all[1] ?? all[0]; // try a second display if present
  const win = new BrowserWindow({
    x: target.bounds.x,
    y: target.bounds.y,
    width: target.bounds.width,
    height: target.bounds.height,
    show: false,
    frame: false,
    fullscreen: true,
    backgroundColor: '#000000',
    webPreferences: {
      preload: join(__dirname, '../preload/index.js'),
      contextIsolation: true,
      nodeIntegration: false,
    },
  });
  if (isDev && devURL) win.loadURL(devURL + pagePath('grid'));
  else win.loadFile(pagePath('grid'));
  win.once('ready-to-show', () => win.show());
  return win;
}
