import axios from 'axios';

const url = '/api/user';

/**
  * @func login
  * @param { object } credentials username and password
  * @returns { Promise }
  * @returns { object } {token, user: {name, permissions, phone}}
  */
export const login = credentials =>
  axios.post(`${url}/login`, credentials)
    .then(res => res.data);

/**
  * @func register
  * @param { object } userInfo username, password, and code
  * @returns { Promise }
  * @returns { object } {token, user: {name, permissions, phone}}
  */
export const register = userInfo =>
  axios.post(`${url}/register`, userInfo)
    .then(res => res.data);
