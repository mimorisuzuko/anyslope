import { handleActions } from 'redux-actions';
import actions from '../actions';

export default handleActions(
	{
		[actions.setFilter]: (state, action) => {
			const { payload } = action;

			return payload;
		}
	},
	-1
);
