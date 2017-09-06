import { combineReducers } from 'redux';
import user from './userReducer';
import alerts from './alertReducer';
import schedule from './scheduleReducer';
import customers from './customerReducer';

export default combineReducers({
  user,
  alerts,
  schedule,
  customers
});
