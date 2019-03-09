import { createActions } from 'redux-actions';
import { fetchAll } from '../util';

let page = -1;

export default createActions(
	{
		LOAD_ARTICLES: async () => {
			page += 1;

			return await fetchAll(page);
		}
	},
	'START_TO_LOAD_ARTICLES'
);
