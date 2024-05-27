import Error from "../../interfaces/error.interface";
import IPost, { initIPost } from "../../interfaces/post.interface";

export interface IUsePostsStore {
  posts: IPost;
  currentPage: number;
  totalPages: number;
  totalItems: number;
  itemsPerPage: number;
  loading: boolean;
  alertMessage: string;
  errorMessage: Error | null | unknown;
  setCurrentPage: (page: number) => void;
  fetchPosts: (currentPage: number, itemsPerPage: number) => void;
  handleUpdateStatusPost: (id: string, status: string) => void;
  handleDeletePost: (id: string) => void;
}

export const initialPostsStoreState = {
  posts: initIPost,
  currentPage: 1,
  totalPages: 1,
  totalItems: 0,
  itemsPerPage: 10,
  loading: true,
  alertMessage: '',
  errorMessage: '',
  setCurrentPage: () => {},
}