import * as types from '../actions/actionTypes';
import initialState from '../store/initialState';
const { customers } = initialState;

export default (state=customers, action) => {
  switch(action.type) {
    case types.CUSTOMER_ADD_PENDING:
      return {...state, fetching: true};
    case types.CUSTOMER_ADD_FULFILLED:
      return {
        ...state,
        customers: [...state.customers, action.payload],
        fetching: false
      };
    case types.CUSTOMER_ADD_REJECTED:
      return {...state, fetching: false};
    case types.CUSTOMER_LIST_PENDING:
      return {...state, fetching: true};
    case types.CUSTOMER_LIST_FULFILLED:
      return {customers: action.payload, fetching: false};
    case types.CUSTOMER_LIST_REJECTED:
      return {...state, fetching: false};
    default:
      return state;
  }
};
