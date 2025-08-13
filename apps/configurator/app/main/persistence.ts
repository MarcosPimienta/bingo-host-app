import { app } from 'electron';
import { mkdir, readFile, rename, writeFile, stat } from 'node:fs/promises';
import { constants as fsConst, createWriteStream } from 'node:fs';
import { join } from 'node:path';
import type { ConfigSettings, SessionState } from '../../shared/state-types';

const DIR = app.getPath('userData');
const CONFIG_FILE = join(DIR, 'config.json');
const SESSION_FILE = join(DIR, 'session.json');

async function ensureDir() {
  try {
    await mkdir(DIR, { recursive: true });
  } catch {}
}

export async function loadConfig(): Promise<ConfigSettings | null> {
  try {
    await ensureDir();
    const buf = await readFile(CONFIG_FILE);
    return JSON.parse(buf.toString());
  } catch {
    return null;
  }
}

export async function saveConfig(cfg: ConfigSettings): Promise<void> {
  await ensureDir();
  const tmp = CONFIG_FILE + '.tmp';
  await writeFile(tmp, JSON.stringify(cfg, null, 2), 'utf8');
  await rename(tmp, CONFIG_FILE);
}

export async function loadSession(): Promise<SessionState | null> {
  try {
    await ensureDir();
    const buf = await readFile(SESSION_FILE);
    return JSON.parse(buf.toString());
  } catch {
    return null;
  }
}

export async function saveSession(state: SessionState): Promise<void> {
  await ensureDir();
  const tmp = SESSION_FILE + '.tmp';
  await writeFile(tmp, JSON.stringify(state, null, 2), 'utf8');
  await rename(tmp, SESSION_FILE);
}

export const paths = { DIR, CONFIG_FILE, SESSION_FILE };