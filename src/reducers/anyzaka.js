import { handleActions } from 'redux-actions';
import actions from '../actions';
import Anyzaka from '../anyzaka';
import _ from 'lodash';

export default handleActions(
	{
		[actions.init]: (state, { payload }) => {
			console.error(payload);

			return state.addExtraBlogs(payload.extraBlogs);
		},
		[actions.addArticles]: (state, { payload }) => {
			_.forEach(payload, ({ length }, i) => {
				if (length > 0) {
					state = state.updateIn(['slopes', i], (entry) => {
						return entry.update('page', (page) => {
							return page + 1;
						});
					});
				}
			});

			return state;
		}
	},
	new Anyzaka()
);
