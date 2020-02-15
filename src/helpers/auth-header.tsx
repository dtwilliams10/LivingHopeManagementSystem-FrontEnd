import { authenticationService } from '../services/authentication.service';

export function authHeader() {
  // return authorization header with jwt token
  const currentUser = authenticationService.currentUserValue;
  //console.log(currentUser.token);
  //console.log(currentUser);
  if (currentUser && currentUser.token) {
    return { Authorization: `Bearer ${currentUser.token}` };
  } else {
    console.log('User not retrieved');
    return {};
  }
}
