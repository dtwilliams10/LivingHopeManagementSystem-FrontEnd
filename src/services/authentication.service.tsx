import { BehaviorSubject } from 'rxjs';
//import { useHistory } from 'react-router-dom'
import axios from 'axios';

const endpoint: string = 'users/authenticate';
const url = process.env.REACT_APP_API + endpoint;

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
  const user = await axios.post(url, {
    username: username,
    password: password
  });
  // store user details and jwt token in local storage to keep user logged in between page refreshes
  localStorage.setItem('currentUser', JSON.stringify(user));
  currentUserSubject.next(user);
  return user;
}

function logout() {
  //let history = useHistory();
  // remove user from local storage to log user out
  localStorage.removeItem('currentUser');
  currentUserSubject.next(null);
  //history.push("/")
}
