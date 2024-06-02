import Error from "../../interfaces/error.interface";
import IComment, { initIComment } from "../../interfaces/comment.interface";


export interface IUseCommentsStore {
  comments: IComment;
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
  comments: initIComment,
  currentPage: 1,
  totalPages: 1,
  totalItems: 0,
  itemsPerPage: 10,
  loading: true,
  alertMessage: '',
  errorMessage: '',
  setCurrentPage: () => {},
}