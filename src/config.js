import { remote } from 'electron';
import libpath from 'path';

const HOMEDIR = libpath.join(
	remote === undefined ? process.cwd() : remote.app.getAppPath(),
	'app/dst'
);

export const ICONS_DIR = libpath.join(HOMEDIR, 'assets/icons');
export const EXTRA_ICONS_DIR = libpath.join(ICONS_DIR, 'extra');
