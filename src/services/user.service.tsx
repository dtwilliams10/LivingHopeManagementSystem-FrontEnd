import { authHeader } from '../helpers/auth-header';
import { handleResponse } from '../helpers/handle-response';

const url = process.env.REACT_APP_URL;

export const userService = {
  getAll,
  getById
};

function getAll() {
  const requestOptions = { method: 'GET', headers: authHeader() };
  return fetch(url + `users`, requestOptions).then(handleResponse);
}

function getById(id: number) {
  const requestOptions = { method: 'GET', headers: authHeader() };
  return fetch(url + `users/${id}`, requestOptions).then(handleResponse);
}
