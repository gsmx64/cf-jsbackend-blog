import { create } from "zustand";
import { AxiosResponse } from "axios";

import CommentsService from "../../services/comments.service";
import { initialCommentsStoreState, IUseCommentsStore } from "../interfaces/comments.interface";

const useCommentsStore = create<IUseCommentsStore>((set) => ({
  ...initialCommentsStoreState,
  setCurrentPage: (page: number) => set(() => ({ currentPage: page })),
  fetchComments: (currentPage: number, itemsPerPage: number) => {
    try {
      set(() => ({ loading: true, errorMessage: '' }));

      return CommentsService
      .getAll(currentPage, itemsPerPage)
      .then((response: AxiosResponse) => {
        set(() => ({
          comments: response.data.data,
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
  handleDeleteComment: (id: string) => {
    try {
      set(() => ({ loading: true, alertMessage: '', errorMessage: '' }));

      return CommentsService
      .remove(id)
      .then((response: AxiosResponse) => {
        if (response.data.affected === 1) {
          set(() => ({ alertMessage: `Deleted comment with id: ${id}.` }));
        } else {  
          set(() => ({ errorMessage: `Error deleting comment with id: ${id}. Comment not found.` }));
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

export default useCommentsStore;