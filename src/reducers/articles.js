import { handleActions } from 'redux-actions';
import actions from '../actions';
import { List } from 'immutable';

export default handleActions(
	{
		[actions.loadArticles]: (state, action) => {
			const { payload } = action;

			return state.push(...payload);
		},
		[actions.showArticle]: (state, { payload }) => {
			return state.update(
				state.findIndex(({ id }) => id === payload),
				(a) => {
					return a.set('temporaryVisible', true);
				}
			);
		}
	},
	List()
);
