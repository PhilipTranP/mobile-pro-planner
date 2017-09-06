import axios from 'axios';
import JWT from 'jwt-client';

const getConfig = () => {
  return {
    headers: {
      Authorization: JWT.get()
    }
  };
};

const url = '/api/customer';

export const add = customer =>
  axios.put(`${url}/new`, customer, getConfig())
    .then(res => res.data);

export const getAll = () =>
  axios.get(`${url}/`, getConfig())
    .then(res => res.data);
