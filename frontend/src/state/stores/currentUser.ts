import { create } from "zustand";
import { AxiosResponse } from "axios";

import { initialCurrentUsersStoreState, IUseCurrentUserStore } from "../interfaces/currentUser.interface";
import AuthService from "../../services/auth.service";
import IUser from "../../interfaces/user.interface";


const useCurrentUserStore = create<IUseCurrentUserStore>((set) => ({
  ...initialCurrentUsersStoreState,
  setCurrentUser: (user: IUser | undefined) => set(() => ({ currentUser: user, loading: true})),
  fetchCurrentUser: () => {
    try {
      return AuthService.getCurrentUser()
      .then((response: AxiosResponse) => {
        set(() => ({ currentUser: response.data, loading: false }));
      });
    } catch (error) {
      set(() => ({ currentUser: undefined, loading: false}));
    }
  }
}));

export default useCurrentUserStore;