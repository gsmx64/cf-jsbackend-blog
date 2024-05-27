import { create } from "zustand";
import { AxiosResponse } from "axios";

import PostsService from "../../services/posts.service";
import { initialPostsStoreState, IUsePostsStore } from "../interfaces/posts.interface";

const usePostsStore = create<IUsePostsStore>((set) => ({
  ...initialPostsStoreState,
  setCurrentPage: (page: number) => set(() => ({ currentPage: page })),
  fetchPosts: (currentPage: number, itemsPerPage: number) => {
    try {
      set(() => ({ loading: true, errorMessage: '' }));

      return PostsService
      .getAll(currentPage, itemsPerPage)
      .then((response: AxiosResponse) => {
        set(() => ({
          posts: response.data.data,
          totalPages: response.data.meta.totalPages,
          totalItems: response.data.meta.totalItems,
          itemsPerPage: response.data.meta.itemsPerPage,
          loading: false
        }));
      })
      .catch((error: Error | null | any) => {
        set(() => ({ errorMessage: error.toString()+" :: "+JSON.stringify(error.response.data.message) }));
      })
      .finally(() => {
        set(() => ({ loading: false }));
      });
    } catch (error: any) {
      set(() => ({ errorMessage: error.toString(), loading: false }));
    }
  },
  handleUpdateStatusPost: (id: string, status: string) => {
    try {
      const data = {status: status};
      set(() => ({ loading: true, alertMessage: '', errorMessage: '' }));

      return PostsService
      .update(id, data)
      .then((response: AxiosResponse) => {
        if (response.data.affected === 1) {
          set(() => ({ alertMessage: `Status change to ${status} for post id: ${id}` }));
        } else {  
          set(() => ({ errorMessage: `Error changing status to post with id: ${id}. Post not found.` }));
        }
      })
      .catch((error: any) => {
        set(() => ({ errorMessage: error.toString()+" :: "+JSON.stringify(error.response.data.message) }));
      })
      .finally(() => {
        set(() => ({ loading: false }));
      });
    } catch (error: any) {
      set(() => ({ errorMessage: error.toString(), loading: false }));
    }
  },
  handleDeletePost: (id: string) => {
    try {
      set(() => ({ loading: true, alertMessage: '', errorMessage: '' }));

      return PostsService
      .remove(id)
      .then((response: AxiosResponse) => {
        if (response.data.affected === 1) {
          set(() => ({ alertMessage: `Deleted post with id: ${id}.` }));
        } else {  
          set(() => ({ errorMessage: `Error deleting post with id: ${id}. Post not found.` }));
        }
      })
      .catch((error: any) => {
        set(() => ({ errorMessage: error.toString()+" :: "+JSON.stringify(error.response.data.message) }));
      })
      .finally(() => {
        set(() => ({ loading: false }));
      });
    } catch (error: any) {
      set(() => ({ errorMessage: error.toString(), loading: false }));
    }
  }
}));

export default usePostsStore;