import { create } from "zustand";
import { AxiosResponse } from "axios";

import PostsService from "../../services/posts.service";
import { initialPostStoreState, IUsePostStore } from "../interfaces/post.interface";
import CategoriesService from "../../services/categories.service";


const usePostStore = create<IUsePostStore>((set) => ({
  ...initialPostStoreState,
  setReset: () => set(() => ({ loading: false, alertMessage: '', errorMessage: '' })),
  fetchPost: (id: string | undefined) => {
    try {
      set(() => ({ loading: true, errorMessage: '' }));

      return PostsService.get(id)
      .then((response: AxiosResponse<any>) => {
        set(() => ({ post: response.data }));
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
  fetchActiveCategories: () => {
    set(() => ({ loading: true, errorMessage: '' }));

    return CategoriesService.getAll(1, 1000)
      .then((response: AxiosResponse) => {
        set(() => ({ activeCategories: response.data.data }));
      })
      .catch((error: any) => {
        set(() => ({ errorMessage: error.toString()+" :: "+JSON.stringify(error.response) }));
      })
      .finally(() => {
        set(() => ({ loading: false }));
      });
  },
  handleUpdateStatusPost: (id: string, status: string, title: string) => {
    try {
      const data = {status: status};
      set(() => ({ loading: true, alertMessage: '', errorMessage: '' }));

      return PostsService
      .update(id, data)
      .then((response: AxiosResponse) => {
        if (response.data.affected === 1) {
          set(() => ({ alertMessage: `Status change to "${status}" for post: "${title}"` }));
        } else {  
          set(() => ({ errorMessage: `Error changing status to post: "${title}". Post not found.` }));
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
  handleDeletePost: (id: string, title: string) => {
    try {
      set(() => ({ loading: true, alertMessage: '', errorMessage: '' }));

      return PostsService
      .remove(id)
      .then((response: AxiosResponse) => {
        if (response.data.affected === 1) {
          set(() => ({ alertMessage: `Deleted post: "${title}".` }));
        } else {  
          set(() => ({ errorMessage: `Error deleting post: "${title}". Post not found.` }));
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
  handleEditPostSaveClick: (id: string | undefined, data: any) => {
    try {
      set(() => ({ loading: true, alertMessage: '', errorMessage: '' }));

      return PostsService
      .update(id, data)
      .then((response: AxiosResponse) => {
        if(response.data) {
          set(() => ({ alertMessage: `Post "${data.title}" edited!` }));
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