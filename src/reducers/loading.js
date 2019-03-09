import { handleActions } from 'redux-actions';
import actions from '../actions';

export default handleActions(
	{
		[actions.startToLoadArticles]: () => {
			return true;
		},
		[actions.loadArticles]: () => {
			return false;
		}
	},
	false
);
