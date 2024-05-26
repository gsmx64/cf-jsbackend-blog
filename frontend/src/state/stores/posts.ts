import { create } from "zustand";
import { AxiosResponse } from "axios";

import PostsService from "../../services/posts.service";
import { initialPostsStoreState, IUsePostsStore } from "../interfaces/post.interface";
//import { initIPost } from "../../interfaces/post.interface";

const usePostsStore = create<IUsePostsStore>((set, get) => ({
  ...initialPostsStoreState,
  /*posts: initIPost,
  currentPage: 1,
  totalPages: 1,
  totalItems: 0,
  itemsPerPage: 10,
  loading: true,
  errorMessage: '',*/
  setCurrentPage: (/*page: number*/) => set(() => ({ currentPage: get().currentPage/*page*/ })),
  fetchPosts: (currentPage: number, itemsPerPage: number) => {
    try {
      //setErrorMessage('');
      //setLoading(true);
    set(() => ({ loading: true, errorMessage: '' }));

      return PostsService
      .getAll(currentPage, itemsPerPage)
      .then((response: AxiosResponse) => {
        //setPosts(response.data.data);
        set(() => ({
          posts: response.data.data,
          totalPages: response.data.meta.totalPages,
          totalItems: response.data.meta.totalItems,
          itemsPerPage: response.data.meta.itemsPerPage,
          loading: false
        }));
        //setTotalPages(response.data.meta.totalPages);
        //setTotalItems(response.data.meta.totalItems);
        //setItemsPerPage(response.data.meta.itemsPerPage);
      })
      .catch((error: Error | null | any) => {
        //setErrorMessage(error.toString()+" :: "+JSON.stringify(error.response.data.message));
        set(() => ({ errorMessage: error.toString()+" :: "+JSON.stringify(error.response.data.message) }));
      })
      .finally(() => {
        //setLoading(false);
        set(() => ({ loading: false }));
      });
    } catch (error: any) {
      //setErrorMessage(error);
      set(() => ({ errorMessage: error.toString(), loading: false }));
    }
  },
}));

export default usePostsStore;