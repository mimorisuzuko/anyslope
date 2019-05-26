import { createActions } from 'redux-actions';
import fetch from '../fetch';
import fs from 'fs-extra';
import libpath from 'path';
import anyzaka from '../anyzaka';
import { EXTRA_ICONS_DIR, CONFIG_DIR } from '../config';

const extraBlogsPath = libpath.join(CONFIG_DIR, 'extra-blogs.json');

export default createActions(
	{
		LOAD_ARTICLES: async () => {
			return await fetch();
		},
		INIT_EXTRA_BLOGS: async () => {
			if (!fs.existsSync(extraBlogsPath)) {
				fs.writeJsonSync(extraBlogsPath, {});
			}

			if (fs.existsSync(EXTRA_ICONS_DIR)) {
				fs.removeSync(EXTRA_ICONS_DIR);
			}

			fs.mkdirSync(EXTRA_ICONS_DIR);

			const extraBlogsJson = fs.readJsonSync(extraBlogsPath);
			await anyzaka.addExtraBlogs(extraBlogsJson);

			return extraBlogsJson;
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
	'CAN_LOAD_ARTICLES',
	'UPDATE_OTHER_BLOGS'
);
