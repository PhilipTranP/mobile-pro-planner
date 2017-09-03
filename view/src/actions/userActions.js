import * as types from './actionTypes';
import { flashMessage } from './alertActions';
import * as user from '../api/userApi';
import JWT from 'jwt-client';

export const checkForLogin = () => dispatch => {
  if(JWT.validate(JWT.remember()))
    dispatch({type: types.USER_RESUME, payload: localStorage.getItem('user')});
};

export const login = credentials => dispatch => {
  if(!(credentials && credentials.username && credentials.password))
    return flashMessage('danger', 'All fields required')(dispatch);
  dispatch({type: types.USER_LOGIN_PENDING});
  user.login(credentials)
    .then(data => {
      if(data.token) {
        JWT.keep(data.token);
        dispatch({type: types.USER_LOGIN_FULFILLED, payload: data.user});
        flashMessage('success', 'You are now logged in')(dispatch);
      } else {
        dispatch({type: types.USER_LOGIN_REJECTED});
        flashMessage('danger', 'Incorrect username or password')(dispatch);
      }
    })
    .catch(() => {
      dispatch({type: types.USER_LOGIN_REJECTED});
      flashMessage('warning', 'Something went wrong while logging in. please try again.')(dispatch);
    });
};

export const register = history => userInfo => dispatch => {
  console.log(userInfo);
  if(!(userInfo.username && userInfo.password && userInfo.code))
    return flashMessage('danger', 'All fields required!')(dispatch);
  dispatch({type: types.USER_REGISTER_PENDING});
  user.register(userInfo)
    .then(data => {
      if(!data.token) {
        console.log(data);
        dispatch({type: types.USER_REGESTER_REJECTED});
        flashMessage('danger', data.msg)(dispatch);
      } else {
        JWT.keep(data.token);
        dispatch({type: types.USER_REGISTER_FULFILLED, payload: data.user});
        flashMessage('success', 'You are now registered and logged in')(dispatch);
        history.push('/');
      }
    })
    .catch(e => {
      console.log(e);
      dispatch({type: types.USER_REGESTER_REJECTED});
      flashMessage('warning', 'Something went wrong while talking to the server')(dispatch);
    });
};
