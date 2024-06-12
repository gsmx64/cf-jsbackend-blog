import { create } from "zustand";
import { AxiosResponse } from "axios";

import CategoriesService from "../../services/categories.service";
import { initialCategoryStoreState, IUseCategoryStore } from "../interfaces/category.interface";


const useCategoryStore = create<IUseCategoryStore>((set) => ({
  ...initialCategoryStoreState,
  fetchCategory: (id: string | undefined) => {
    try {
      set(() => ({ loading: true, alertMessage: '', errorMessage: '' }));

      return CategoriesService
      .get(id)
      .then((response: AxiosResponse) => {
        set(() => ({
          category: response.data,
          loading: false
        }));
      })
      .catch((error: Error | null | any) => {
        set(() => ({ errorMessage: error.toString()+" :: "+JSON.stringify(error.response) }));
      })
      .finally(() => {
        set(() => ({ loading: false }));
      });
    } catch (error: any) {
      set(() => ({ errorMessage: error.toString(), loading: false }));
    }
  },
  handleUpdateStatusCategory: (id: string, status: string, title: string) => {
    try {
      const data = {status: status};
      set(() => ({ loading: true, errorMessage: '' }));

      return CategoriesService
      .update(id, data)
      .then((response: AxiosResponse) => {
        if (response.data.affected === 1) {
          set(() => ({ alertMessage: `Status change to "${status}" for category: "${title}"` }));
        } else {  
          set(() => ({ errorMessage: `Error changing status to category: "${title}". Category not found.` }));
        }
      })
      .catch((error: any) => {
        set(() => ({ errorMessage: error.toString()+" :: "+JSON.stringify(error.response) }));
      })
      .finally(() => {
        set(() => ({ loading: false }));
      });
    } catch (error: any) {
      set(() => ({ errorMessage: error.toString(), loading: false }));
    }
  },
  handleDeleteCategory: (id: string, title: string) => {
    try {
      set(() => ({ loading: true, alertMessage: '', errorMessage: '' }));

      return CategoriesService
      .remove(id)
      .then((response: AxiosResponse) => {
        if (response.data.affected === 1) {
          set(() => ({ alertMessage: `Deleted category: "${title}".` }));
        } else {  
          set(() => ({ errorMessage: `Error deleting category: "${title}". Category not found.` }));
        }
      })
      .catch((error: any) => {
        set(() => ({ errorMessage: error.toString()+" :: "+JSON.stringify(error.response) }));
      })
      .finally(() => {
        set(() => ({ loading: false }));
      });
    } catch (error: any) {
      set(() => ({ errorMessage: error.toString(), loading: false }));
    }
  },
  handleEditCategorySaveClick: (id: string | undefined, data: any) => {
    try {
      set(() => ({ loading: true, alertMessage: '', errorMessage: '' }));

      return CategoriesService
      .update(id, data)
      .then((response: AxiosResponse) => {        
        if(response.data) {
          set(() => ({ alertMessage: `Category "${data.title}" created!` }));
          return void 1;
        }
      })
      .catch((error: any) => {
        set(() => ({ errorMessage: error.toString()+" :: "+JSON.stringify(error.response) }));
      })
      .finally(() => {
        set(() => ({ loading: false }));
      });
    } catch (error: any) {
      set(() => ({ errorMessage: error.toString(), loading: false }));
    }
  }
}));

export default useCategoryStore;