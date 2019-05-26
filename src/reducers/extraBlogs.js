import { handleActions } from 'redux-actions';
import actions from '../actions';

export default handleActions(
	{
		[actions.initExtraBlogs]: (state, { payload }) => {
			return JSON.stringify(payload, null, 4);
		},
		[actions.updateOtherBlogs]: (state, { payload }) => {
			return payload;
		}
	},
	''
);
