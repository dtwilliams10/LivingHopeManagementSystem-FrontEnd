import { BehaviorSubject } from 'rxjs';
//import { handleResponse } from '../helpers/handle-response';
import axios from 'axios';

const endpoint: string = 'users/authenticate';
const url = process.env.REACT_APP_URL + endpoint;

const currentUserSubject = new BehaviorSubject(
  JSON.parse(localStorage.getItem('currentUser'))
);

export const authenticationService = {
  login,
  logout,
  currentUser: currentUserSubject.asObservable(),
  get currentUserValue() {
    return currentUserSubject.value;
  }
};

export function login(username, password) {
  let params = {
    username: username,
    password: password
  };
  axios.post(url, params).then(user => {
    console.log(user);
    // store user details and jwt token in local storage to keep user logged in between page refreshes
    localStorage.setItem('currentUser', JSON.stringify(user));
    currentUserSubject.next(user);

    return user;
  });
}

export function logout() {
  // remove user from local storage to log user out
  localStorage.removeItem('currentUser');
  currentUserSubject.next(null);
}
