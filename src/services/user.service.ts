import { authHeader } from '../helpers/auth-header';
import { handleResponse } from '../helpers/handle-response';

const url = process.env.REACT_APP_AAS;

export const userService = {
  getAll,
  getById
};

async function getAll() {
  const requestOptions = { method: 'GET', headers: authHeader() };
  return fetch(url + `users`, requestOptions).then(handleResponse);
}

async function getById(id: number) {
  const requestOptions = { method: 'GET', headers: authHeader() };
  return fetch(url + `users/${id}`, requestOptions).then(handleResponse);
}
