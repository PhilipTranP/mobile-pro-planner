import axios from 'axios';
import JWT from 'jwt-client';

const getConfig = () => {
  return {
    headers: {
      Authorization: JWT.get()
    }
  };
};

export const getSchedule = () =>
  axios.get('/api/schedule', getConfig())
    .then(res => res.data);
