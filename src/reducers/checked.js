import { handleActions } from 'redux-actions';
import actions from '../actions';
import { List } from 'immutable';
import fs from 'fs-extra';
import libpath from 'path';
import { CONFIG_DIR } from '../config';

const path = libpath.join(CONFIG_DIR, 'checked.json');

if (!fs.existsSync(path)) {
	fs.writeJsonSync(path, []);
}

export default handleActions(
	{
		[actions.toggleChecked]: (state, { payload }) => {
			const i = state.indexOf(payload);
			const next = i === -1 ? state.push(payload) : state.delete(i);

			fs.writeJsonSync(path, next.toJS());

			return next;
		}
	},
	List(fs.readJsonSync(path))
);
