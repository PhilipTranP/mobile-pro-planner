import * as types from '../actions/actionTypes';
import initialState from '../store/initialState';
const { schedule } = initialState;

export default (state=schedule, action) => {
  switch(action.type) {
    case types.SCHEDULE_GET_PENDING:
      return {...state, fetching: true};
    case types.SCHEDULE_GET_FULFILLED:
      return {fetching: false, appointments: action.payload};
    case types.SCHEDULE_GET_REJECTED:
      return {...state, fetching: false};
    default:
      return state;
  }
};
