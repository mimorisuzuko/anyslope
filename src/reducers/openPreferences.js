import { handleActions } from 'redux-actions';
import actions from '../actions';

export default handleActions(
	{
		[actions.setPreferencesState]: (state, action) => {
			const { payload } = action;

			return payload;
		}
	},
	false
);
