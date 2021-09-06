import { accountService } from '../services/account.service';

export function authHeader() {
  // return authorization header with jwt token
  const currentUser = accountService.userValue;
  if (currentUser && currentUser.jwtToken) {
    console.log("Authorization: `Bearer ", currentUser.jwtToken);
    return { Authorization: `Bearer ${currentUser.jwtToken}` };
  } else {
    console.log('User not retrieved');
    return {};
  }
}
