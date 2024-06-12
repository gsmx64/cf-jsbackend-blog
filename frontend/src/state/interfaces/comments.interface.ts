import Error from "../../interfaces/error.interface";
import { ICommentArray, initICommentArray } from "../../interfaces/comment.interface";


export interface IUseCommentsStore {
  comments: ICommentArray;
  currentPage: number;
  totalPages: number;
  totalItems: number;
  itemsPerPage: number;
  loading: boolean;
  alertMessage: string;
  errorMessage: Error | null | unknown;
  setCurrentPage: (page: number) => void;
  fetchComments: (currentPage: number, itemsPerPage: number) => void;
  handleDeleteComment: (id: string) => void;
}

export const initialCommentsStoreState = {
  comments: initICommentArray,
  currentPage: 1,
  totalPages: 1,
  totalItems: 0,
  itemsPerPage: 10,
  loading: false,
  alertMessage: '',
  errorMessage: '',
  setCurrentPage: () => {},
}