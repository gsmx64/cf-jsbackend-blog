import { create } from "zustand";
import { AxiosResponse } from "axios";

import CategoriesService from "../../services/categories.service";
import { initialCategoriesStoreState, IUseCategoriesStore } from "../interfaces/categories.interface";

const useCategoriesStore = create<IUseCategoriesStore>((set) => ({
  ...initialCategoriesStoreState,
  setCurrentPage: (page: number) => set(() => ({ currentPage: page })),
  fetchCategories: (currentPage: number, itemsPerPage: number) => {
    try {
      set(() => ({ loading: true, alertMessage: '', errorMessage: '' }));

      return CategoriesService
      .getAll(currentPage, itemsPerPage)
      .then((response: AxiosResponse) => {
        set(() => ({
          categories: response.data.data,
          totalPages: response.data.meta.totalPages,
          totalItems: response.data.meta.totalItems,
          itemsPerPage: response.data.meta.itemsPerPage,
          loading: false
        }));
      })
      .catch((error: Error | null | any) => {
        set(() => ({ errorMessage: error.toString()+" :: "+JSON.stringify(error.response.data.message) }));
      })
      .finally(() => {
        set(() => ({ loading: false }));
      });
    } catch (error: any) {
      set(() => ({ errorMessage: error.toString(), loading: false }));
    }
  },
  handleUpdateStatusCategory: (id: string, status: string) => {
    try {
      const data = {status: status};
      set(() => ({ loading: true, errorMessage: '' }));

      return CategoriesService
      .update(id, data)
      .then((response: AxiosResponse) => {
        if (response.data.affected === 1) {
          set(() => ({ alertMessage: `Status change to ${status} for category id: ${id}` }));
        } else {  
          set(() => ({ errorMessage: `Error changing status to category with id: ${id}. Category not found.` }));
        }
      })
      .catch((error: any) => {
        set(() => ({ errorMessage: error.toString()+" :: "+JSON.stringify(error.response.data.message) }));
      })
      .finally(() => {
        set(() => ({ loading: false }));
      });
    } catch (error: any) {
      set(() => ({ errorMessage: error.toString(), loading: false }));
    }
  },
  handleDeleteCategory: (id: string) => {
    try {
      set(() => ({ loading: true, alertMessage: '', errorMessage: '' }));

      return CategoriesService
      .remove(id)
      .then((response: AxiosResponse) => {
        if (response.data.affected === 1) {
          set(() => ({ alertMessage: `Deleted category with id: ${id}.` }));
        } else {  
          set(() => ({ errorMessage: `Error deleting category with id: ${id}. Category not found.` }));
        }
      })
      .catch((error: any) => {
        set(() => ({ errorMessage: error.toString()+" :: "+JSON.stringify(error.response.data.message) }));
      })
      .finally(() => {
        set(() => ({ loading: false }));
      });
    } catch (error: any) {
      set(() => ({ errorMessage: error.toString(), loading: false }));
    }
  }
}));

export default useCategoriesStore;