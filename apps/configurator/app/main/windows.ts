import { BrowserWindow, screen, app } from 'electron';
import { join } from 'node:path';

export type WindowKeys = 'configurator' | 'host' | 'main' | 'grid';

const isDev = !app.isPackaged;
const RENDERER_DIR = join(__dirname, '../../renderer'); // when packaged

function pagePath(name: WindowKeys) {
  if (isDev) {
    // IMPORTANT: in dev, Vite serves from /entries/*.html
    const map: Record<WindowKeys, string> = {
      configurator: '/entries/configurator.html',
      host: '/entries/host-controller.html',
      main: '/entries/main-display.html',
      grid: '/entries/numbers-grid.html',
    };
    return map[name];
  } else {
    // in prod, we load built html files from dist/renderer root
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
    title: 'Configurator',
    width: 1200,
    height: 800,
    autoHideMenuBar: false,
    show: false,
    webPreferences: {
      preload: join(__dirname, '../preload/index.js'),
      contextIsolation: true,
      nodeIntegration: false,
    },
  });
  if (isDev && devURL) win.loadURL(devURL + pagePath('configurator'));
  else win.loadFile(pagePath('configurator'));

  wireLoadLogging(win, 'Configurator');
  win.once('ready-to-show', () => win.show());
  return win;
}

export function createHostWindow(devURL?: string) {
  const win = new BrowserWindow({
    title: 'Host Controller',
    width: 1400,
    height: 900,
    autoHideMenuBar: false,
    show: false,
    webPreferences: {
      preload: join(__dirname, '../preload/index.js'),
      contextIsolation: true,
      nodeIntegration: false,
    },
  });
  if (isDev && devURL) win.loadURL(devURL + pagePath('host'));
  else win.loadFile(pagePath('host'));

  wireLoadLogging(win, 'Host Controller');
  win.once('ready-to-show', () => win.show());
  return win;
}

export function createMainDisplayWindow(devURL?: string) {
  const primary = screen.getPrimaryDisplay();
  const win = new BrowserWindow({
    title: 'Main Display',
    x: primary.bounds.x,
    y: primary.bounds.y,
    width: primary.bounds.width,
    height: primary.bounds.height,
    frame: false,
    fullscreen: true,
    backgroundColor: '#000000',
    autoHideMenuBar: true,
    show: false,
    webPreferences: {
      preload: join(__dirname, '../preload/index.js'),
      contextIsolation: true,
      nodeIntegration: false,
    },
  });
  if (isDev && devURL) win.loadURL(devURL + pagePath('main'));
  else win.loadFile(pagePath('main'));

  wireLoadLogging(win, 'Main Display');
  win.once('ready-to-show', () => win.show());
  return win;
}

export function createNumbersGridWindow(devURL?: string) {
  const all = screen.getAllDisplays();
  const target = all[1] ?? all[0];
  const win = new BrowserWindow({
    title: 'Numbers Grid',
    x: target.bounds.x,
    y: target.bounds.y,
    width: target.bounds.width,
    height: target.bounds.height,
    frame: false,
    fullscreen: true,
    backgroundColor: '#000000',
    autoHideMenuBar: true,
    show: false,
    webPreferences: {
      preload: join(__dirname, '../preload/index.js'),
      contextIsolation: true,
      nodeIntegration: false,
    },
  });
  if (isDev && devURL) win.loadURL(devURL + pagePath('grid'));
  else win.loadFile(pagePath('grid'));

  wireLoadLogging(win, 'Numbers Grid');
  win.once('ready-to-show', () => win.show());
  return win;
}

// Small helper for visibility during dev
function wireLoadLogging(win: BrowserWindow, label: string) {
  win.webContents.on('did-finish-load', () => {
    console.log(`[${label}] did-finish-load`);
  });
  win.webContents.on('did-fail-load', (_e, code, desc, url) => {
    console.error(`[${label}] did-fail-load ${code} ${desc} url=${url}`);
  });
}
