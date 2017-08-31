import * as types from '../actions/actionTypes';
import initialState from '../store/initialState';
const { user } = initialState;

export default (state=user, action) => {
  switch (action.type) {
    case types.USER_LOGIN_PENDING:
      return {...state, fetching: true};
    case types.USER_LOGIN_FULFILLED:
      return {
        ...state,
        fetching: false,
        isLoggedIn: true,
        user: action.payload
      };
    case types.USER_LOGIN_REJECTED:
      return {...state, fetching: false};
    case types.USER_RESUME:
      return {
        ...state,
        fetching: false,
        isLoggedIn: true,
        user: action.payload
      };
    default:
      return state;
  }
};
