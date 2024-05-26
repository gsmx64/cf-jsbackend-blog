import Error from "../../interfaces/error.interface";
import IPost, { initIPost } from "../../interfaces/post.interface";

export interface IUsePostsStore {
  posts: IPost;
  currentPage: number;
  totalPages: number;
  totalItems: number;
  itemsPerPage: number;
  loading: boolean;
  errorMessage: Error | null | unknown;
  setCurrentPage: (/*page: number*/) => void;
}

export const initialPostsStoreState = {
  posts: initIPost,
  currentPage: 1,
  totalPages: 1,
  totalItems: 0,
  itemsPerPage: 10,
  loading: true,
  errorMessage: '',
  setCurrentPage: (/*page: number*/) => {},
}