import { handleActions } from 'redux-actions';
import actions from '../actions';
import AnySlope from '../models/AnySlope';
import _ from 'lodash';
import { fromJS } from 'immutable';

export default handleActions(
    {
        [actions.init]: (state, { payload: { initSlopes } }) => {
            return new AnySlope({ slopes: fromJS(initSlopes) });
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
    new AnySlope()
);
