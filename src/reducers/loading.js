import { handleActions } from 'redux-actions';
import actions from '../actions';
import Loading from '../models/Loading';

export default handleActions(
    {
        [actions.startToLoadArticles]: (state) => {
            return state.set('_now', true);
        },
        [actions.addArticles]: (state) => {
            return state.set('_now', false);
        },
        [actions.canLoadArticles]: (state, { payload }) => {
            return state.set('_can', payload);
        }
    },
    new Loading({ _now: true })
);
