import { combineReducers } from 'redux';
import user from './userReducer';
import alerts from './alertReducer';

export default combineReducers({
  user,
  alerts
});
