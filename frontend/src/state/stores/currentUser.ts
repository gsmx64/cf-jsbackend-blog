import { AxiosResponse } from "axios";
import { create } from "zustand";

import AuthService from "../../services/auth.service";
import { initialCurrentUsersStoreState, IUseCurrentUserStore } from "../interfaces/currentUser.interface";
import IUser, { IUserPassword, IUserRegister } from "../../interfaces/user.interface";


const useCurrentUserStore = create<IUseCurrentUserStore>((set, get) => ({
  ...initialCurrentUsersStoreState,
  setCurrentUser: (user: IUser | undefined) => set(() => ({ currentUser: user})),
  fetchCurrentUser: () => {
    try {
      const userStr = localStorage.getItem('user');
      return (userStr != null) ? AuthService
      .getCurrentUser()
      .then((response: AxiosResponse) => {
        const userLocal = JSON.parse(userStr);
        const user = response.data;
        if (userLocal?.user?.id == user?.id) {
          set(() => ({ currentUser: response.data }));
        } else {
          set(() => ({ currentUser: undefined }));
        }
      })
      .catch(() => {
        set(() => ({ currentUser: undefined }));
      }) : set(() => ({ currentUser: undefined }));
    } catch (error) {
      set(() => ({ currentUser: undefined}));
    }
  },
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
              (response.data.access_token !== undefined) &&
              (response.data.access_token !== '') &&
              (response.data.user.id !== undefined)
            ) {
              localStorage.setItem('user', JSON.stringify(response.data));
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
  handleLoginUserSaveClick: (username: string, password: string) => {
    try {
      set(() => ({ loading: true, alertMessage: '', errorMessage: '' }));

      return AuthService
      .login(username, password)
      .then((response: AxiosResponse) => {
        if(
          (response.data.access_token !== undefined) &&
          (response.data.access_token !== '') &&
          (response.data.user.id !== undefined) &&
          (response.data.user.status === 'BANNED')
        ) {
          set(() => ({
            errorMessage: 'You was banned from this blog! You can not loggin!',
            currentUser: undefined
          }));
        } else if(
          (response.data.access_token !== undefined) &&
          (response.data.access_token !== '') &&
          (response.data.user.id !== undefined) &&
          (response.data.user.status === 'PENDING')
        ) {
          set(() => ({
            errorMessage: 'You must activate your account first! Check your email.',
            currentUser: undefined
          }));
        } else if(
          (response.data.access_token !== undefined) &&
          (response.data.access_token !== '') &&
          (response.data.user.id !== undefined) &&
          (response.data.user.status !== 'BANNED') &&
          (response.data.user.status !== 'PENDING')
        ) {
          localStorage.setItem('user', JSON.stringify(response.data));
          set(() => ({ alertMessage: 'Login successful, redirecting to home page...' }));
        } else {
          set(() => ({ errorMessage: 'Error logging in user.', currentUser: undefined }));
        }
      })
      .catch((error: any) => {
        if(
          (error.response.data.statusCode === 401) &&
          (error.response.data.error === 'Unauthorized')
        ) {
          set(() => ({ errorMessage: 'Wrong username and/or password. Try again!' }));
        } else {
          set(() => ({ errorMessage: JSON.stringify(error.response.data.error)+": "+JSON.stringify(error.response.data.message) }));
        }
      })
      .finally(() => {
        set(() => ({ loading: false }));
      });
    } catch (error: any) {
      set(() => ({ errorMessage: error.toString(), loading: false }));
    }
    return undefined;
  },
  handleChangePasswordSaveClick: (data: IUserPassword) => {
    try {
      set(() => ({ loading: true, alertMessage: '', errorMessage: '' }));
      const userStr = localStorage.getItem('user');

      return (userStr != null) ? AuthService
      .changeOwnPassword(data)
      .then((response: AxiosResponse) => {
        if(response.data.affected === 1) {
          set(() => ({ alertMessage: 'Password updated!' }));
          setTimeout(function(){
            AuthService.logout();
            set(() => ({ currentUser: undefined}));
          }, 7000);
        } else {
          set(() => ({ alertMessage: `Password not updated! ${response.data.message}` }));
        }
      })
      .catch((error: any) => {
        set(() => ({ errorMessage: JSON.stringify(error.response.data.message) }));
      })
      .finally(() => {
        set(() => ({ loading: false }));
      }) : set(() => ({ loading: false }));
    } catch (error: any) {
      set(() => ({ errorMessage: error.toString(), loading: false }));
    }
    return undefined;
  },
  handleChangeAvatarSaveClick: (data: any) => {
    try {
      set(() => ({ loading: true, alertMessage: '', errorMessage: '' }));
      const userStr = localStorage.getItem('user');

      return (userStr != null) ? AuthService
      .changeOwnAvatar(data.avatar)
      .then((response: AxiosResponse) => {
        if(response.data.affected === 1) {
          set(() => ({ alertMessage: 'Avatar updated!' }));
          set((state) => ({
            currentUser: {
              ...state.currentUser,
              avatar: data.avatar,
            }
          }));
          get().fetchCurrentUser();
        } else {
          set(() => ({ alertMessage: `Avatar not updated! ${response.data.message}` }));
        }
      })
      .catch((error: any) => {
        set(() => ({ errorMessage: JSON.stringify(error.response.data.message) }));
      })
      .finally(() => {
        set(() => ({ loading: false }));
      }) : set(() => ({ loading: false }));
    } catch (error: any) {
      set(() => ({ errorMessage: error.toString(), loading: false }));
    }
    return undefined;
  },
  handleLogOutClick: (event: any) => {
    event.stopPropagation();
    AuthService.logout();
    set(() => ({ currentUser: undefined }));
  }
}));

export default useCurrentUserStore;