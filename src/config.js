import { remote } from 'electron';
import libpath from 'path';
import os from 'os';

const {
	env: { NODE_ENV }
} = process;
const APP_DIR = libpath.join(
	remote === undefined ? process.cwd() : remote.app.getAppPath(),
	'app/dst'
);

export const CONFIG_DIR = libpath.join(os.homedir(), '.anyzaka');
export const ICONS_DIR = libpath.join(APP_DIR, 'assets/icons');
export const EXTRA_ICONS_DIR = libpath.join(ICONS_DIR, 'extra');
export const EXTRA_BLOGS_CONFIG_PATH = libpath.join(
	CONFIG_DIR,
	'extra-blogs.json'
);
export const isDevelopment = NODE_ENV === 'development';
export const ANY_SLOPE_DEFAULT_VALUE_PATH = libpath.join(
	APP_DIR,
	'../../src/models/anyslope.json'
);
export const CACHED_EXTRA_BLOGS_CONFIG_PATH = libpath.join(
	CONFIG_DIR,
	'extra-blogs.cache.json'
);
export const CACHED_ANY_SLOPE_VALUE_PATH = libpath.join(
	os.homedir(),
	'anyslope.cache.json'
);
