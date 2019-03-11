import { handleActions } from 'redux-actions';
import actions from '../actions';
import { List } from 'immutable';
import fs from 'fs-extra';
import os from 'os';
import libpath from 'path';

const path = libpath.join(os.homedir(), '.anyzaka', 'following.json');

export default handleActions(
	{
		[actions.init]: (state, { payload: { following } }) => {
			return List(following);
		},
		[actions.toggleFollowing]: (state, { payload }) => {
			const i = state.indexOf(payload);
			const next = i === -1 ? state.push(payload) : state.delete(i);

			fs.writeJsonSync(path, next.toJS());

			return next;
		}
	},
	List()
);
