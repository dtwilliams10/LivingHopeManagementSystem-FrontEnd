export interface User {
  id?: string;
  firstName: string;
  lastName: string;
  email: string;
  role: string;
  created: Date;
  updated: Date;
  isVerified: boolean;
  jwtToken: string;
  refreshToken: string;
}

export interface UserFormValues {
  email: string;
  password: string;
  displayName?: string;
  userName?: string;
}
