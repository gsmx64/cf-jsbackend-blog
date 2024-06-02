import { create } from "zustand";
import { AxiosResponse } from "axios";

import UsersService from "../../services/users.service";
import { initialUserStoreState, IUseUserStore } from "../interfaces/user.interface";
import PostsService from "../../services/posts.service";
import CommentsService from "../../services/comments.service";


const usePostStore = create<IUseUserStore>((set) => ({
  ...initialUserStoreState,
  fetchUser: (id: string | undefined) => {
    try {
      set(() => ({ loading: true, errorMessage: '' }));

      return UsersService.get(id)
      .then((response: AxiosResponse) => {
        set(() => ({ user: response.data }));
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
  fetchUserComments: (id: string | undefined, limit: number | null = null) => {
    try {
      set(() => ({ loading: true, alertMessage: '', errorMessage: '' }));
      return CommentsService
      .getUserComments(id, limit)
      .then((response: AxiosResponse) => {
        set(() => ({ userComments: response.data }));
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
  fetchUserPosts: (id: string | undefined, limit: number | null = null) => {
    try {
      set(() => ({ loading: true, alertMessage: '', errorMessage: '' }));
      return PostsService
      .getUserPosts(id, limit)
      .then((response: AxiosResponse) => {
        set(() => ({ userPosts: response.data }));
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
  handleEditUserSaveClick: (id: string, data: any) => {
    try {
      set(() => ({ loading: true, alertMessage: '', errorMessage: '' }));

      return UsersService
      .update(id, data)
      .then((response: AxiosResponse) => {
        if(response.data.affected === 1) {
          set(() => ({ alertMessage: `Profile updated!` }));
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

export default usePostStore;