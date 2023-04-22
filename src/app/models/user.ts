import { ParsedQuery } from "query-string";

export interface User {
  username: string;
  displayName: string;
  jwtToken: string;
  image?: string;
}

export interface UserFormValues {
  email: string;
  password: string;
  displayName?: string;
  userName?: string;
}
