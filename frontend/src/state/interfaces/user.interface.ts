import { ICommentArray, initICommentArray } from "../../interfaces/comment.interface";
import Error from "../../interfaces/error.interface";
import { initIPostArray, IPostArray } from "../../interfaces/post.interface";
import IUser, { initIUser } from "../../interfaces/user.interface";


export interface IUseUserStore {
  user: IUser;
  userComments: ICommentArray;
  userPosts: IPostArray;
  loading: boolean;
  alertMessage: string;
  errorMessage: Error | null | unknown;
  fetchUser: (id: string | undefined) => void;
  fetchUserComments: (userId: string | undefined, limit: number | null) => void;
  fetchUserPosts: (userId: string | undefined, limit: number | null) => void;
  handleEditUserSaveClick: (id: string, data: any) => void;
}

export const initialUserStoreState = {
  user: initIUser,
  userPosts: initIPostArray,
  userComments: initICommentArray,
  loading: true,
  alertMessage: '',
  errorMessage: '',
  setCurrentPage: () => {},
}