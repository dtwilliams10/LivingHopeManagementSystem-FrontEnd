import { accountService } from '../services/account.service';

export function authHeader() {
  // return authorization header with jwt token
  const currentUser = accountService.userValue;
  console.log(currentUser.data.token);
  console.log(currentUser);
  if (currentUser && currentUser.data.token) {
    return { Authorization: `Bearer ${currentUser.data.token}` };
  } else {
    console.log('User not retrieved');
    return {};
  }
}
