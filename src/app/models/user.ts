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

export class User implements User {
  constructor(
    public firstName: string = "",
    public lastName: string = "",
    public email: string = "",
    public role: string = "",
    public created: Date = new Date(),
    public updated: Date = new Date(),
    public isVerified: boolean = false,
    public jwtToken: string = "",
    public refreshToken: string = "",
    public id?: string
  ) {
    this.firstName = firstName ?? "";
    this.lastName = lastName ?? "";
    this.email = email ?? "";
    this.role = role ?? "";
    this.created = created ?? new Date();
    this.updated = updated ?? new Date();
    this.isVerified = isVerified ?? false;
    this.jwtToken = jwtToken ?? "";
    this.refreshToken = refreshToken ?? "";
    this.id = id ?? "";
  }
}
