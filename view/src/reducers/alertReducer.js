import * as types from '../actions/actionTypes';
import initialState from '../store/initialState';
const { alerts } = initialState;

export default (state=alerts, action) => {
  switch(action.type) {
    case types.ALERT_PUSH:
      return [...state, action.payload];
    case types.ALERT_POP:
      return state.filter(alert => alert.id !== action.payload);
    default:
      return state;
  }
};
