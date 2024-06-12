import Error from "../../interfaces/error.interface";
import ICategory, { initICategory } from "../../interfaces/category.interface";


export interface IUseCategoryStore {
  category: ICategory;
  loading: boolean;
  alertMessage: string;
  errorMessage: Error | null | unknown;
  fetchCategory: (id: string | undefined) => void;
  handleUpdateStatusCategory: (id: string, status: string, title: string) => void;
  handleDeleteCategory: (id: string, title: string) => void;
  handleEditCategorySaveClick: (id: string | undefined, data: any) => any;
}

export const initialCategoryStoreState = {
  category: initICategory,
  loading: false,
  alertMessage: '',
  errorMessage: '',
}