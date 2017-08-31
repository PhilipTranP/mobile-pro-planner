import * as types from './actionTypes';

export const flashMessage = (style, message) => dispatch => {
  const id = Math.floor(Math.random()*1000000);
  dispatch({type: types.ALERT_PUSH, payload: {id, style, message}});
  window.setTimeout(() => closeMessage(id)(dispatch) ,7000);
};

export const closeMessage = id => dispatch =>
  dispatch({type: types.ALERT_POP, payload: id});
