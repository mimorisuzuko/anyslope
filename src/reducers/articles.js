import { handleActions } from 'redux-actions';
import actions from '../actions';
import { List } from 'immutable';
import _ from 'lodash';

export default handleActions(
    {
        [actions.init]: (state, { payload: { debugArticles } }) => {
            return List(debugArticles);
        },
        [actions.addArticles]: (state, { payload }) => {
            _.forEach(payload, (a) => {
                _.forEach(a, (b) => {
                    state = state.push(b);
                });
            });

            return state.sortBy(({ date }) => -date);
        },
        [actions.showArticle]: (state, { payload }) => {
            return state.update(
                state.findIndex(({ id }) => id === payload),
                (a) => {
                    return a.set('temporaryVisible', true);
                }
            );
        },
        [actions.updateParsedQuery]: (state) => {
            return state.map((a) => {
                return a.set('temporaryVisible', false);
            });
        }
    },
    List()
);
