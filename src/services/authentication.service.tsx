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

async function login(username: string, password: string) {
  console.log('Calling axios post for user authentication');
  const user = await axios.post(url, {
    username: username,
    password: password
  });
  console.log(user);
  // store user details and jwt token in local storage to keep user logged in between page refreshes
  localStorage.setItem('currentUser', JSON.stringify(user));
  currentUserSubject.next(user);
  return user;
}

function logout() {
  // remove user from local storage to log user out
  localStorage.removeItem('currentUser');
  currentUserSubject.next(null);
}
