import ISettings from "./settings.interface";
import IUser, { IUserPassword, IUserRegister } from "./user.interface";

export default interface RouteDefinition {
  name: string;
  urlPath: string;
  acl: boolean | undefined;
  search?: boolean;
  Component: React.ComponentType<React.PropsWithChildren> | any;
  children?: RouteDefinition[];
  ComponentOnACLFail?: React.ComponentType<React.PropsWithChildren> | any;
  ComponentOnError?: React.ComponentType<React.PropsWithChildren> | any;
}

export interface IProps  {
  currentUser: IUser | undefined,
  loading: boolean;
  alertMessage: string;
  errorMessage: Error | null | unknown;
  settings: ISettings,
  searchTerm: string,
  setSearchTerm: (term: any) => void,
  handleNavbarSearch: (term: any) => void,
  handleRegisterUserSaveClick: (body: IUserRegister) => void,
  handleLoginUserSaveClick: (username: string, password: string) => void,
  handleChangePasswordSaveClick: (data: IUserPassword) => void,
  handleChangeAvatarSaveClick: (data: any) => void,
  handleLogOutClick: (event: any) => void,
  containerRef: any
}