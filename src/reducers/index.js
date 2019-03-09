import { combineReducers } from 'redux';
import articles from './articles';
import loading from './loading';

export default combineReducers({ articles, loading });
