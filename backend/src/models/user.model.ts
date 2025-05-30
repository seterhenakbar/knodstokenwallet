export interface User {
  id?: string;
  email: string;
  password?: string;
}

export interface UserInDB {
  id: string;
  fields: {
    [key: string]: any;
  };
}

export interface UserCreate {
  email: string;
  password: string;
}

export interface UserLogin {
  email: string;
  password: string;
}

export interface PasswordReset {
  email: string;
  newPassword: string;
}
