import { BehaviorSubject } from 'rxjs';
import axios from 'axios';

const endpoint: string = 'accounts/authenticate';
const url = process.env.REACT_APP_AAS + endpoint;

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

async function login(email: string, password: string) {
  const user = await axios.post(url, {
    email: email,
    password: password
  });
  // store user details and jwt token in local storage to keep user logged in between page refreshes
  localStorage.setItem('currentUser', JSON.stringify(user));
  currentUserSubject.next(user);
  return user;
}

function logout() {
  localStorage.removeItem('currentUser');
  currentUserSubject.next(null);
}
