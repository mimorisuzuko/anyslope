import { createActions } from 'redux-actions';
import fetch from '../fetch';
import fs from 'fs-extra';
import libpath from 'path';
import os from 'os';
import { remote } from 'electron';
import _ from 'lodash';
import lineblog from '../lineblog';
import rp from 'request-promise';
import anyzaka from '../anyzaka';

let page = -1;
const { app } = remote;
const dirname = libpath.join(os.homedir(), '.anyzaka');
const checkedFile = libpath.join(dirname, 'checked.json');
const followingFile = libpath.join(dirname, 'following.json');
const otherBlogsFile = libpath.join(dirname, 'other-blogs.json');
const extraIconsDirname = libpath.join(
	app.getAppPath(),
	'app/dst/assets/icons/extras'
);

const convertOtherBlogsForAnyzaka = async (otherBlogs) => {
	const ret = {};

	for (const key of _.keys(otherBlogs)) {
		if (key === 'line') {
			if (!_.has(ret, key)) {
				ret[key] = {
					name: 'LINE BLOG',
					color: 'rgb(90, 196, 127)',
					_ids: [],
					_fetcher: 'fetchLineBlog',
					_optionsList: [],
					members: []
				};
			}

			for (let value of otherBlogs[key]) {
				if (typeof value === 'string') {
					value = [value, { pages: 1 }];
				}

				const [id, options] = value;
				const { url, name } = await lineblog.idToImageUrlAndName(id);

				await fs.writeFile(
					libpath.join(extraIconsDirname, `${name}.jpg`),
					await rp(url, { encoding: null })
				);

				ret[key]._optionsList.push(options);
				ret[key]._ids.push(id);
				ret[key].members.push(name);
			}
		}
	}

	return ret;
};

export default createActions(
	{
		LOAD_ARTICLES: async () => {
			page += 1;

			return await fetch(page);
		},
		INIT: async () => {
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

			if (fs.existsSync(extraIconsDirname)) {
				fs.removeSync(extraIconsDirname);
			}

			fs.mkdirSync(extraIconsDirname);

			const otherBlogs = fs.readJsonSync(otherBlogsFile);
			anyzaka.addOtherBlogs(
				await convertOtherBlogsForAnyzaka(otherBlogs)
			);

			return {
				checked: fs.readJsonSync(checkedFile),
				following: fs.readJsonSync(followingFile),
				otherBlogs: JSON.stringify(otherBlogs, null, 4)
			};
		}
	},
	'START_TO_LOAD_ARTICLES',
	'SET_FILTER',
	'TOGGLE_CHECKED',
	'TOGGLE_FOLLOWING',
	'SHOW_ARTICLE',
	'SET_PREFERENCES_STATE',
	'UPDATE_PREFERENCES',
	'SET_SEARCH_VISIBLE',
	'UPDATE_SEARCH_QUERY',
	'UPDATE_PARSED_QUERY',
	'CAN_LOAD_ARTICLES'
);
