import { createActions } from 'redux-actions';
import fs from 'fs-extra';
import AnySlope from '../models/AnySlope';
import {
	EXTRA_BLOGS_CONFIG_PATH,
	isDevelopment,
	CACHED_EXTRA_BLOGS_CONFIG_PATH,
	EXTRA_ICONS_DIR,
	CACHED_ANY_SLOPE_VALUE_PATH
} from '../config';
import libpath from 'path';
import * as fetchers from '../fetchers';
import _ from 'lodash';
import Aritcle from '../models/Article';
import dayjs from 'dayjs';
import defaultSlopes from '../models/anyslope.json';
import { List } from 'immutable';

export default createActions(
	{
		INIT: async () => {
			const extraBlogsText = await fs.readFile(EXTRA_BLOGS_CONFIG_PATH, {
				encoding: 'utf-8'
			});
			const extraBlogs = JSON.parse(extraBlogsText);
			const cachedExtraBlogs = await fs.readJson(
				CACHED_EXTRA_BLOGS_CONFIG_PATH,
				{
					encoding: 'utf-8'
				}
			);
			let initSlopes = null;

			if (!_.isEqual(extraBlogs, cachedExtraBlogs)) {
				if (await fs.exists(EXTRA_ICONS_DIR)) {
					await fs.remove(EXTRA_ICONS_DIR);
				}

				await fs.mkdir(EXTRA_ICONS_DIR);
				await fs.writeJson(CACHED_EXTRA_BLOGS_CONFIG_PATH, extraBlogs);

				initSlopes = await AnySlope.mergeExtraBlogs(
					defaultSlopes,
					extraBlogs
				);

				await fs.writeJSON(CACHED_ANY_SLOPE_VALUE_PATH, initSlopes);
			} else {
				initSlopes = _.map(
					await fs.readJson(CACHED_ANY_SLOPE_VALUE_PATH),
					(a) => {
						if (!a.extra) {
							return a;
						}

						return _.update(a, '_optionsList', (_optionsList) => {
							return _.map(_optionsList, (options) => {
								return _.update(
									options,
									'filters',
									(filters) => {
										return _.map(filters, ([a, b]) =>
											List([a, new RegExp(b)])
										);
									}
								);
							});
						});
					}
				);
			}

			const debugArticles = [];

			if (isDevelopment) {
				const testdir = libpath.join(process.cwd(), 'src/test-htmls');

				for (const filename of await fs.readdir(testdir)) {
					debugArticles.push(
						..._.map(
							await fetchers[_.split(filename, '.')[0]].parse(
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
				initSlopes,
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
