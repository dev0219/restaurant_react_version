import { combineReducers } from 'redux';
import items from './items';
import userinfo from './users';
import restaurantinfo from './restaurant';

export default combineReducers({
    items,
    userinfo,
    restaurantinfo
});
