import Error from "../../interfaces/error.interface";
import IPost, { initIPost, initIPostArray, IPostArray } from "../../interfaces/post.interface";


export interface IUsePostsStore {
  post: IPost;
  posts: IPostArray;
  currentPage: number;
  totalPages: number;
  totalItems: number;
  itemsPerPage: number;
  loading: boolean;
  alertMessage: string;
  errorMessage: Error | null | unknown;
  setCurrentPage: (page: number) => void;
  fetchPost: (postId: string | undefined) => void;
  fetchPosts: (currentPage: number, itemsPerPage: number) => void;
  handleUpdateStatusPost: (id: string, status: string, title: string) => void;
  handleDeletePost: (id: string, title: string) => void;
}

export const initialPostsStoreState = {
  post: initIPost,
  posts: initIPostArray,
  currentPage: 1,
  totalPages: 1,
  totalItems: 0,
  itemsPerPage: 10,
  loading: true,
  alertMessage: '',
  errorMessage: '',
  setCurrentPage: () => {},
}