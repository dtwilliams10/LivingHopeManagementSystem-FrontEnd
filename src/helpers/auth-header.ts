export function authHeader() {
  // return authorization header with jwt token
  const currentUser = sessionStorage.getItem("currentUserToken");
  console.log(currentUser);
  if (currentUser.length > 1) {
    console.log("Authorization: `Bearer ", currentUser);
    return { Authorization: `Bearer ${currentUser}` };
  } else {
    console.log('User not retrieved');
  }
}
