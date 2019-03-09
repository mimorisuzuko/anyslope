import { handleActions } from 'redux-actions';
import actions from '../actions';
import { List } from 'immutable';

export default handleActions(
	{
		[actions.loadArticles]: (state, action) => {
			const { payload } = action;

			return state.push(...payload);
		}
	},
	List()
);
