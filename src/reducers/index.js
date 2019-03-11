import { combineReducers } from 'redux';
import articles from './articles';
import loading from './loading';
import openFilterIndex from './openFilterIndex';
import checked from './checked';
import following from './following';

export default combineReducers({
	articles,
	loading,
	openFilterIndex,
	checked,
	following
});
