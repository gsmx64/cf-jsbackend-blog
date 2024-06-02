import { create } from "zustand";
import { AxiosResponse } from "axios";

import CommentsService from "../../services/comments.service";
import { initialCommentStoreState, IUseCommentStore } from "../interfaces/comment.interface";
import { ICommentCreate } from "../../interfaces/comment.interface";


const useCommentStore = create<IUseCommentStore>((set) => ({
  ...initialCommentStoreState,
  fetchComment: (commentId: string | undefined) => {
    try {
      set(() => ({ loading: true, errorMessage: '' }));

      return CommentsService
      .get(commentId)
      .then((response: AxiosResponse) => {
        set(() => ({
          comment: response.data
        }));
      })
      .catch((error: Error | null | any) => {
        set(() => ({ errorMessage: error.toString()+" :: "+JSON.stringify(error.response) }));
      })
      .finally(() => {
        set(() => ({ loading: false }));
      });
    } catch (error: any) {
      set(() => ({ errorMessage: error.toString(), loading: false }));
    }
  },
  handleEditCommentSaveClick: (id: string | undefined, data: any) => {
    try {
      set(() => ({ loading: true, alertMessage: '', errorMessage: '' }));

      return CommentsService
      .update(id, data)
      .then((response: AxiosResponse) => {        
        if(response.data) {
          set(() => ({ alertMessage: `Comment edited!` }));
          return void 1;
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
    return undefined;
  },
  handleNewCommentSaveClick: (id: string, data: ICommentCreate) => {
    try {
      set(() => ({ loading: true, alertMessage: '', errorMessage: '' }));

      return CommentsService
      .create({
        ...data,
        post: id,
      })
      .then((response: AxiosResponse) => {
        if(response.data) {
          set(() => ({ alertMessage: 'Comment created!' }));
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

export default useCommentStore;