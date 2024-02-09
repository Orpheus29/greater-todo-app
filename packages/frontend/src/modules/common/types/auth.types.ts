export interface Token {
  token: string;
}

export interface IUser {
  id: string;
  email: string;
}

export interface IUserRequest {
  email: string;
  password: string;
}

export interface IRequestReset {
  email: string;
}

export interface IResetPassword {
  id: string;
  newPassword: string;
}

export interface IChangePassword {
  id: string;
  oldPassword: string;
  newPassword: string;
}
