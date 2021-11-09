export function authHeader() {
  // return authorization header with jwt token
  const currentUser = sessionStorage.getItem("currentUserToken");
  if (currentUser.length > 1) {
    return { Authorization: `Bearer ${currentUser}` };
  } else {
    console.log('User not retrieved');
  }
}
