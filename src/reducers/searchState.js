import { handleActions } from 'redux-actions';
import actions from '../actions';
import Search from '../models/Search';

export default handleActions(
	{
		[actions.setSearchVisible]: (state, { payload }) => {
			return state.set('visible', payload);
		},
		[actions.updateSearchQuery]: (state, { payload }) => {
			return state.set('query', payload);
		},
		[actions.updateParsedQuery]: (state) => {
			return state.updateParsedQuery();
		}
	},
	new Search()
);
