import IUser, { initIUser } from "../../interfaces/user.interface";


export interface IUseCurrentUserStore {
  currentUser: IUser;
  loading: boolean;
  setCurrentUser: (user: IUser | undefined) => void;
  fetchCurrentUser: () => void;
}

export const initialCurrentUsersStoreState = {
  currentUser: {...initIUser, role: 'NONE'},
  loading: false
}