import * as types from './actionTypes';
import { flashMessage } from './alertActions';
import * as user from '../api/userApi';
import JWT from 'jwt-client';

export const checkForLogin = history => () => dispatch => {
  try {
    if(JWT.validate(JWT.remember()))
      dispatch({type: types.USER_RESUME, payload: localStorage.getItem('user')});

    else history.push('/login');
  } catch (e) {
    history.push('/login');
  }
};

export const login = history => credentials => dispatch => {
  if(!(credentials && credentials.username && credentials.password))
    return flashMessage('danger', 'All fields required')(dispatch);
  dispatch({type: types.USER_LOGIN_PENDING});
  user.login(credentials)
    .then(data => {
      if(data.token) {
        JWT.keep(data.token);
        dispatch({type: types.USER_LOGIN_FULFILLED, payload: data.user});
        flashMessage('success', 'You are now logged in')(dispatch);
        history.push('/');
        localStorage.setItem('user', data.user);
      } else {
        dispatch({type: types.USER_LOGIN_REJECTED});
        flashMessage('danger', 'Incorrect username or password')(dispatch);
      }
    })
    .catch((e) => {
      console.log(e);
      dispatch({type: types.USER_LOGIN_REJECTED});
      flashMessage('warning', 'Something went wrong while logging in. please try again.')(dispatch);
    });
};

export const register = history => userInfo => dispatch => {
  if(!(userInfo.username && userInfo.password && userInfo.code))
    return flashMessage('danger', 'All fields required!')(dispatch);
  dispatch({type: types.USER_REGISTER_PENDING});
  user.register(userInfo)
    .then(data => {
      if(!data.token) {
        dispatch({type: types.USER_REGESTER_REJECTED});
        flashMessage('danger', data.msg)(dispatch);
      } else {
        JWT.keep(data.token);
        dispatch({type: types.USER_REGISTER_FULFILLED, payload: data.user});
        flashMessage('success', 'You are now registered and logged in')(dispatch);
        history.push('/');
        localStorage.setItem('user', data.user);
      }
    })
    .catch(() => {
      dispatch({type: types.USER_REGESTER_REJECTED});
      flashMessage('warning', 'Something went wrong while talking to the server')(dispatch);
    });
};

export const logout = history => () => dispatch => {
  JWT.forget();
  localStorage.removeItem('user');
  dispatch({type: types.USER_LOGOUT});
  flashMessage('success', 'You are now logged out')(dispatch);
  history.push('/login');
};
