import { remote } from 'electron';
import libpath from 'path';
import os from 'os';

const APP_DIR = libpath.join(
	remote === undefined ? process.cwd() : remote.app.getAppPath(),
	'app/dst'
);

export const CONFIG_DIR = libpath.join(os.homedir(), '.anyzaka');
export const ICONS_DIR = libpath.join(APP_DIR, 'assets/icons');
export const EXTRA_ICONS_DIR = libpath.join(ICONS_DIR, 'extra');
