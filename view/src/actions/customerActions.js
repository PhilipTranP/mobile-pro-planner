import * as types from './actionTypes';
import * as customer from '../api/customerApi';
import { flashMessage } from './alertActions';


export const addCustomer = cx => dispatch => {
  if(!(cx && cx.name))
    return flashMessage('danger', "We need at least a name")(dispatch);
  dispatch({type: types.CUSTOMER_ADD_PENDING});
  customer.add(cx)
    .then(data => {
      flashMessage('success', 'Customer Added')(dispatch);
      dispatch({type: types.CUSTOMER_ADD_FULFILLED, payload: data});
    })
    .catch(() => {
      flashMessage('warning', 'Something went wrong communicating with the server')(dispatch);
      dispatch({type: types.CUSTOMER_ADD_REJECTED});
    });
};

export const getCustomers = () => dispatch => {
  dispatch({type: types.CUSTOMER_LIST_PENDING});
  customer.getAll()
    .then(data =>
      dispatch({type: types.CUSTOMER_LIST_FULFILLED, payload: data})
    )
    .catch(() => {
      dispatch({type: types.CUSTOMER_LIST_REJECTED});
      flashMessage('warning', 'Something went wrong communicating with the server');
    });
};
