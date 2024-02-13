import IUser from "./user.interface";

/*export interface PayloadToken {
  sub: string;
  role: ROLES;
}*/

export interface AuthBody {
  username: string;
  password: string;
}

export const initIAuth: any = {
  username: '',
  password: '',
};

export interface AuthResponse {
  access_token: string;
  user: IUser;
}

/*export interface IUseToken {
  role: string;
  sub:  string;
  isExpired: boolean
}

export interface TypeUserRoleforLogging {
  user: string;
  role: string;
}*/