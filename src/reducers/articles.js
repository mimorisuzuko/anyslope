import { handleActions } from 'redux-actions';
import actions from '../actions';
import { List } from 'immutable';

export default handleActions(
	{
		[actions.addArticles]: (state, action) => {
			const { payload } = action;

			return state.push(...payload).sortBy(({ date }) => -date);
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
	List()
);
