import { handleActions } from 'redux-actions';
import actions from '../actions';

export default handleActions(
	{
		[actions.init]: (state, { payload: { extraBlogsText } }) => {
			return extraBlogsText;
		},
		[actions.updateOtherBlogs]: (state, { payload }) => {
			return payload;
		}
	},
	''
);
