import Error from "../../interfaces/error.interface";
import IUser, { initIUser } from "../../interfaces/user.interface";


export interface IUseUsersStore {
  users: IUser;
  currentPage: number;
  totalPages: number;
  totalItems: number;
  itemsPerPage: number;
  loading: boolean;
  alertMessage: string;
  errorMessage: Error | null | unknown;
  setCurrentPage: (page: number) => void;
  fetchUsers: (currentPage: number, itemsPerPage: number) => void;
  handleUpdateUserRole: (id: string, username: string, role: string) => void;
  handleBanUser: (id: string, username: string, ban: boolean) => void;
  handleActivateUser: (id: string, username: string, activate: boolean) => void;
  handleDeleteUser: (id: string, username: string) => void;
}

export const initialUsersStoreState = {
  users: initIUser,
  currentPage: 1,
  totalPages: 1,
  totalItems: 0,
  itemsPerPage: 10,
  loading: false,
  alertMessage: '',
  errorMessage: '',
  setCurrentPage: () => {},
}