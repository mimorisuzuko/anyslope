import { combineReducers } from 'redux';
import articles from './articles';
import loading from './loading';
import openFilterIndex from './openFilterIndex';

export default combineReducers({ articles, loading, openFilterIndex });
