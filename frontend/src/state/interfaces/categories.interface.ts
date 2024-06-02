import Error from "../../interfaces/error.interface";
import { ICategoryArray, initICategoryArray } from "../../interfaces/category.interface";


export interface IUseCategoriesStore {
  categories: ICategoryArray;
  currentPage: number;
  totalPages: number;
  totalItems: number;
  itemsPerPage: number;
  loading: boolean;
  alertMessage: string;
  errorMessage: Error | null | unknown;
  setCurrentPage: (page: number) => void;
  fetchCategories: (currentPage: number, itemsPerPage: number) => void;
  handleUpdateStatusCategory: (id: string, status: string, title: string) => void;
  handleDeleteCategory: (id: string, title: string) => void;
}

export const initialCategoriesStoreState = {
  categories: initICategoryArray,
  currentPage: 1,
  totalPages: 1,
  totalItems: 0,
  itemsPerPage: 10,
  loading: true,
  alertMessage: '',
  errorMessage: '',
  setCurrentPage: () => {},
}