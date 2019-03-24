import { createActions } from 'redux-actions';
import fetch from '../fetch';
import fs from 'fs-extra';
import libpath from 'path';
import os from 'os';
import { remote } from 'electron';
import _ from 'lodash';
import lineblog from '../lineblog';
import rp from 'request-promise';

let page = -1;
const { app } = remote;

export default createActions(
	{
		LOAD_ARTICLES: async () => {
			page += 1;

			return await fetch(page);
		},
		INIT: async () => {
			const dirname = libpath.join(os.homedir(), '.anyzaka');
			const checkedFile = libpath.join(dirname, 'checked.json');
			const followingFile = libpath.join(dirname, 'following.json');
			const otherBlogsFile = libpath.join(dirname, 'other-blogs.json');
			const extraIconsDirname = libpath.join(
				app.getAppPath(),
				'app/dst/assets/icons/extras'
			);

			if (!fs.existsSync(dirname)) {
				fs.mkdirSync(dirname);
			}

			if (!fs.existsSync(checkedFile)) {
				fs.writeJsonSync(checkedFile, []);
			}

			if (!fs.existsSync(followingFile)) {
				fs.writeJsonSync(followingFile, []);
			}

			if (!fs.existsSync(otherBlogsFile)) {
				fs.writeJsonSync(otherBlogsFile, {});
			}

			if (!fs.existsSync(extraIconsDirname)) {
				fs.mkdirSync(extraIconsDirname);
			} else {
				fs.removeSync(extraIconsDirname);
			}

			const otherBlogs = fs.readJsonSync(otherBlogsFile);
			const otherBlogsRet = {};

			for (const key of _.keys(otherBlogs)) {
				if (key === 'line') {
					if (!_.has(otherBlogsRet, key)) {
						otherBlogsRet[key] = {
							ids: [],
							members: []
						};
					}

					for (const id of otherBlogs[key]) {
						const {
							url,
							name
						} = await lineblog.idToImageUrlAndName(id);

						await fs.writeFile(
							libpath.join(extraIconsDirname, `${name}.jpg`),
							await rp(url, { encoding: null })
						);

						otherBlogsRet[key].ids.push(id);
						otherBlogsRet[key].members.push(name);
					}
				}
			}

			return {
				checked: fs.readJsonSync(checkedFile),
				following: fs.readJsonSync(followingFile),
				otherBlogs: otherBlogsRet
			};
		}
	},
	'START_TO_LOAD_ARTICLES',
	'SET_FILTER',
	'TOGGLE_CHECKED',
	'TOGGLE_FOLLOWING',
	'SHOW_ARTICLE',
	'SET_PREFERENCES_STATE',
	'UPDATE_PREFERENCES'
);
