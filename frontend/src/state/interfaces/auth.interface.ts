import { AuthBody } from "../../interfaces/auth.interface";
import { IUserRegister } from "../../interfaces/user.interface";


export interface IUseAuthStore {
  loading: boolean;
  alertMessage: string;
  errorMessage: Error | null | unknown;
  handleRegisterUserSaveClick: (body: IUserRegister) => void;
  handleLoginUserSaveClick: (username: AuthBody, password: AuthBody) => void;
}

export const initialAuthStoreState = {
  loading: true,
  alertMessage: '',
  errorMessage: '',
}