import { combineReducers } from 'redux';
import items from './items';
import userinfo from './users';

export default combineReducers({
    items,
    userinfo
});
