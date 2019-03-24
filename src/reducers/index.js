import { combineReducers } from 'redux';
import articles from './articles';
import loading from './loading';
import openFilterIndex from './openFilterIndex';
import checked from './checked';
import following from './following';
import openPreferences from './openPreferences';
import otherBlogs from './otherBlogs';

export default combineReducers({
	articles,
	loading,
	openFilterIndex,
	checked,
	following,
	openPreferences,
	otherBlogs
});
