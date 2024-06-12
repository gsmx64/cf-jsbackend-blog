import ICategory, { initICategory } from "../../interfaces/category.interface";
import Error from "../../interfaces/error.interface";
import IPost, { initIPost } from "../../interfaces/post.interface";


export interface IUsePostStore {
  post: IPost;
  activeCategories: ICategory;
  loading: boolean;
  alertMessage: string;
  errorMessage: Error | null | unknown;
  fetchPost: (id: string | undefined) => void;
  fetchActiveCategories: () => void;
  handleUpdateStatusPost: (id: string, status: string, title: string) => void;
  handleDeletePost: (id: string, title: string) => void;
  handleEditPostSaveClick: (id: string | undefined, data: any) => void;
}

export const initialPostStoreState = {
  post: initIPost,
  activeCategories: initICategory,
  loading: false,
  alertMessage: '',
  errorMessage: '',
}