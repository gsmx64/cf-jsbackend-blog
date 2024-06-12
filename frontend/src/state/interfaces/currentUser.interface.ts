import IUser, { initIUser, IUserPassword, IUserRegister } from "../../interfaces/user.interface";


export interface IUseCurrentUserStore {
  currentUser: IUser;
  loading: boolean;
  alertMessage: string;
  errorMessage: Error | null | unknown;
  setCurrentUser: (user: IUser | undefined) => void;
  fetchCurrentUser: () => void;
  handleRegisterUserSaveClick: (body: IUserRegister) => void;
  handleLoginUserSaveClick: (username: string, password: string) => void;
  handleChangePasswordSaveClick: (data: IUserPassword) => void;
  handleChangeAvatarSaveClick: (data: any) => void;
  handleLogOutClick: (event: any) => void;
}

export const initialCurrentUsersStoreState = {
  currentUser: {...initIUser, role: 'NONE'},
  loading: false,
  alertMessage: '',
  errorMessage: '',
}