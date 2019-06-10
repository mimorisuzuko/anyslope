import { createActions } from 'redux-actions';
import fs from 'fs-extra';
import Anyzaka from '../anyzaka';
import { EXTRA_BLOGS_CONFIG_PATH } from '../config';
import hjson from 'hjson';

export default createActions(
	{
		INIT: async () => {
			const extraBlogsText = await fs.readFile(EXTRA_BLOGS_CONFIG_PATH, {
				encoding: 'utf-8'
			});

			return {
				extraBlogsText,
				extraBlogs: await Anyzaka.convertExtraBlogs(
					hjson.parse(extraBlogsText)
				)
			};
		}
	},
	'ADD_ARTICLES',
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
