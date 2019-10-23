import { combineReducers } from 'redux';
import articles from './articles';
import loading from './loading';
import openFilterIndex from './openFilterIndex';
import checked from './checked';
import following from './following';
import openPreferences from './openPreferences';
import extraBlogs from './extraBlogs';
import searchState from './searchState';
import anyzaka from './anyzaka';

export default combineReducers({
    articles,
    loading,
    openFilterIndex,
    checked,
    following,
    openPreferences,
    extraBlogs,
    searchState,
    anyzaka
});
