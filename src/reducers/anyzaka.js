import { handleActions } from 'redux-actions';
import actions from '../actions';
import Anyzaka from '../anyzaka';

export default handleActions(
	{
		[actions.init]: (state, { payload: { extraBlogs } }) => {
			state.addExtraBlogs(extraBlogs);

			return state;
		}
	},
	new Anyzaka()
);
