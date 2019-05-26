import { createActions } from 'redux-actions';
import fetch from '../fetch';
import fs from 'fs-extra';
import libpath from 'path';
import _ from 'lodash';
import lineblog from '../lineblog';
import rp from 'request-promise';
import anyzaka from '../anyzaka';
import ameblo from '../ameblo';
import { EXTRA_ICONS_DIR, CONFIG_DIR } from '../config';

const otherBlogsFile = libpath.join(CONFIG_DIR, 'other-blogs.json');

const convertOtherBlogsForAnyzaka = async (otherBlogs) => {
	const ret = {};
	const dic = {
		line: {
			name: 'LINE BLOG',
			color: 'rgb(90, 196, 127)',
			fetcher: lineblog,
			page: 1
		},
		ameblo: {
			name: 'Ameba Blog',
			color: 'rgb(45, 140, 60)',
			fetcher: ameblo,
			page: 1
		}
	};

	for (const key of _.keys(otherBlogs)) {
		if (!_.has(ret, key)) {
			ret[key] = _.merge(
				{
					_ids: [],
					_key: key,
					_optionsList: [],
					members: [],
					extra: true
				},
				dic[key]
			);

			for (let value of otherBlogs[key]) {
				if (typeof value === 'string') {
					value = [value, { pages: 1 }];
				}

				const [id, options] = value;
				const { url, name } = await dic[
					key
				].fetcher.idToImageUrlAndName(id);

				await fs.writeFile(
					libpath.join(EXTRA_ICONS_DIR, `${name}.jpg`),
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
			return await fetch();
		},
		INIT: async () => {
			if (!fs.existsSync(otherBlogsFile)) {
				fs.writeJsonSync(otherBlogsFile, {});
			}

			if (fs.existsSync(EXTRA_ICONS_DIR)) {
				fs.removeSync(EXTRA_ICONS_DIR);
			}

			fs.mkdirSync(EXTRA_ICONS_DIR);

			const otherBlogs = fs.readJsonSync(otherBlogsFile);
			anyzaka.addOtherBlogs(
				await convertOtherBlogsForAnyzaka(otherBlogs)
			);

			return {
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
	'CAN_LOAD_ARTICLES',
	'UPDATE_OTHER_BLOGS'
);
