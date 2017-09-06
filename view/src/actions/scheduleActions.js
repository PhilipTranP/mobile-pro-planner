import * as types from './actionTypes';
import * as schedule from '../api/scheduleApi';
import { flashMessage } from './alertActions';

export const getSchedule = () => dispatch => {
  dispatch({type: types.SCHEDULE_GET_PENDING});
  schedule.getSchedule()
    .then(data => dispatch({type: types.SCHEDULE_GET_FULFILLED, payload: data}))
    .catch(() => {
      dispatch({type: types.SCHEDULE_GET_REJECTED});
      flashMessage('warning', 'Something went wrong while fetching your schedule')(dispatch);
    });
};
