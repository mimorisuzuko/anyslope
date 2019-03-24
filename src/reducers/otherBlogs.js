import { handleActions } from 'redux-actions';
import actions from '../actions';
import anyzaka from '../anyzaka';

export default handleActions(
	{
		[actions.init]: (state, { payload: { otherBlogs } }) => {
			anyzaka.addOtherBlogs(otherBlogs);

			return otherBlogs;
		}
	},
	{}
);
