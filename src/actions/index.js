import { createActions } from 'redux-actions';
import fs from 'fs-extra';
import Anyzaka from '../anyzaka';
import { EXTRA_BLOGS_CONFIG_PATH, isDevelopment } from '../config';
import libpath from 'path';
import LineBlog from '../lineblog';
import Ameblo from '../ameblo';
import { Nogi } from '../anyzaka';
import _ from 'lodash';
import Aritcle from '../models/Article';
import dayjs from 'dayjs';

export default createActions(
	{
		INIT: async () => {
			const extraBlogsText = await fs.readFile(EXTRA_BLOGS_CONFIG_PATH, {
				encoding: 'utf-8'
			});
			const debugArticles = [];

			if (isDevelopment) {
				const testdir = libpath.join(process.cwd(), 'src/test-htmls');
				const parser = {
					lineblog: LineBlog,
					ameblo: Ameblo,
					nogi: Nogi
				};

				for (const filename of await fs.readdir(testdir)) {
					debugArticles.push(
						..._.map(
							await parser[_.split(filename, '.')[0]].parse(
								await fs.readFile(
									libpath.join(testdir, filename),
									{
										encoding: 'utf-8'
									}
								)
							),
							(a) => {
								return new Aritcle({
									...a,
									debug: true,
									date: dayjs()
								});
							}
						)
					);
				}
			}

			return {
				extraBlogsText,
				extraBlogs: await Anyzaka.convertExtraBlogs(
					JSON.parse(extraBlogsText)
				),
				debugArticles
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
