import { createActions } from 'redux-actions';
import { fetchAll } from '../util';
import fs from 'fs-extra';
import libpath from 'path';
import os from 'os';

let page = -1;

export default createActions(
	{
		LOAD_ARTICLES: async () => {
			page += 1;

			return await fetchAll(page);
		},
		INIT: () => {
			const dirname = libpath.join(os.homedir(), '.anyzaka');
			const checkedFile = libpath.join(dirname, 'checked.json');
			const followingFile = libpath.join(dirname, 'following.json');

			if (!fs.existsSync(dirname)) {
				fs.mkdirSync(dirname);
			}

			if (!fs.existsSync(checkedFile)) {
				fs.writeJsonSync(checkedFile, []);
			}

			if (!fs.existsSync(followingFile)) {
				fs.writeJsonSync(followingFile, []);
			}

			return {
				checked: fs.readJsonSync(checkedFile),
				following: fs.readJsonSync(followingFile)
			};
		}
	},
	'START_TO_LOAD_ARTICLES',
	'SET_FILTER',
	'TOGGLE_CHECKED',
	'TOGGLE_FOLLOWING'
);
