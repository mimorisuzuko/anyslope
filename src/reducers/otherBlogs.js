import { handleActions } from 'redux-actions';
import actions from '../actions';

export default handleActions(
	{
		[actions.init]: (state, { payload: { otherBlogs } }) => {
			return otherBlogs;
		}
	},
	''
);
