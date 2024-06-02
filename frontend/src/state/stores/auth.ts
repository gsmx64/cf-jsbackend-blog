import { create } from "zustand";
import { AxiosResponse } from "axios";

import AuthService from "../../services/auth.service";
import { AuthBody } from "../../interfaces/auth.interface";
import { IUseAuthStore, initialAuthStoreState  } from "../interfaces/auth.interface";
import { IUserRegister } from "../../interfaces/user.interface";


const useAuthStore = create<IUseAuthStore>((set) => ({
  ...initialAuthStoreState,
  handleRegisterUserSaveClick: (body: IUserRegister) => {
    try {
      set(() => ({ loading: true, alertMessage: '', errorMessage: '' }));

      return AuthService
      .register(body)
      .then((response: AxiosResponse) => {
        if(response.data.id !== undefined) {
          const { username, password } = body;
          AuthService
          .login(username, password)
          .then((response: AxiosResponse) => {
            if(
              (response.data.id !== undefined) &&
              (response.data.access_token !== '') &&
              (response.data.user.id !== undefined)
            ) {
              set(() => ({ alertMessage: 'Login successful, redirecting to home page...' }))
            } else {
              set(() => ({ errorMessage: 'Error logging in user.' }));
            }
          })
          .catch((error: any) => {
            set(() => ({ errorMessage: error.toString()+" :: "+JSON.stringify(error.response) }));
          })
          .finally(() => {
            set(() => ({ loading: false }));
          });
        } else {
          set(() => ({ errorMessage: 'Error registering user.' }));
        }
      })
      .catch((error: any) => {
        set(() => ({ errorMessage: error.toString()+" :: "+JSON.stringify(error.response) }));
      })
      .finally(() => {
        set(() => ({ loading: false }));
      });
    } catch (error: any) {
      set(() => ({ errorMessage: error.toString(), loading: false }));
    }
  },
  handleLoginUserSaveClick: (username: AuthBody, password: AuthBody) => {
    try {
      set(() => ({ loading: true, alertMessage: '', errorMessage: '' }));

      return AuthService
      .login(username, password)
      .then((response: AxiosResponse) => {
        if(
          (response.data.access_token !== undefined) &&
          (response.data.access_token !== '') &&
          (response.data.user.id !== undefined)
        ) {
          set(() => ({ alertMessage: 'Login successful, redirecting to home page...' }));
        } else {
          set(() => ({ errorMessage: 'Error logging in user.' }));
        }
      })
      .catch((error: any) => {
        set(() => ({ errorMessage: error.toString()+" :: "+JSON.stringify(error.response) }));
      })
      .finally(() => {
        set(() => ({ loading: false }));
      });
    } catch (error: any) {
      set(() => ({ errorMessage: error.toString(), loading: false }));
    }
  }
}));

export default useAuthStore;