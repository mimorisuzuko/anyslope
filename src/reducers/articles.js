import { handleActions } from 'redux-actions';
import actions from '../actions';
import { List } from 'immutable';
import _ from 'lodash';
import Article from '../models/Article';
import { isDevelopment } from '../config';
import Ameblo from '../ameblo';
import fs from 'fs-extra';
import libpath from 'path';
import dayjs from 'dayjs';
import { Nogi } from '../anyzaka';

const _debug_articles = [];

if (isDevelopment) {
	_debug_articles.push(
		..._.map(
			Ameblo.parse(
				fs.readFileSync(
					libpath.join(
						process.cwd(),
						'src/test-htmls/ameblo-emoji.html'
					),
					{
						encoding: 'utf-8'
					}
				)
			),
			(article) => {
				return new Article({
					...article,
					date: dayjs(),
					debug: true
				});
			}
		),
		..._.map(
			Nogi.parse(
				fs.readFileSync(
					libpath.join(
						process.cwd(),
						'src/test-htmls/nogi-emoji.html'
					),
					{
						encoding: 'utf-8'
					}
				)
			),
			(article) => {
				return new Article({
					...article,
					date: dayjs(),
					debug: true
				});
			}
		)
	);
}

export default handleActions(
	{
		[actions.addArticles]: (state, { payload }) => {
			_.forEach(payload, (a) => {
				_.forEach(a, (b) => {
					state = state.push(b);
				});
			});

			return state.sortBy(({ date }) => -date);
		},
		[actions.showArticle]: (state, { payload }) => {
			return state.update(
				state.findIndex(({ id }) => id === payload),
				(a) => {
					return a.set('temporaryVisible', true);
				}
			);
		},
		[actions.updateParsedQuery]: (state) => {
			return state.map((a) => {
				return a.set('temporaryVisible', false);
			});
		}
	},
	List(_debug_articles)
);
