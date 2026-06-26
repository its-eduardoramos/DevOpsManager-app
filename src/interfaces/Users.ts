export interface User {
  id?: string;
  userName: string;
  password?: string;
  email: string;
  roles: string;
}

export interface SessionUser{
  id: string;
  userName: string;
  email: string;
  token: string;
  role: string;
}
