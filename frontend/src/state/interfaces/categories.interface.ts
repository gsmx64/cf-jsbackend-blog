import Error from "../../interfaces/error.interface";
import ICategory, { initICategory } from "../../interfaces/category.interface";

export interface IUseCategoriesStore {
  categories: ICategory;
  currentPage: number;
  totalPages: number;
  totalItems: number;
  itemsPerPage: number;
  loading: boolean;
  alertMessage: string;
  errorMessage: Error | null | unknown;
  setCurrentPage: (page: number) => void;
  fetchCategories: (currentPage: number, itemsPerPage: number) => void;
  handleUpdateStatusCategory: (id: string, status: string) => void;
  handleDeleteCategory: (id: string) => void;
}

export const initialCategoriesStoreState = {
  categories: initICategory,
  currentPage: 1,
  totalPages: 1,
  totalItems: 0,
  itemsPerPage: 10,
  loading: true,
  alertMessage: '',
  errorMessage: '',
  setCurrentPage: () => {},
}