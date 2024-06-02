import { create } from "zustand";
import PostsService from "../services/posts.service";
import IPost, { initIPost } from "../interfaces/post.interface";

interface Error {
    err: unknown;
    isError: boolean;
    error?: Error;
    stack?: Error;
    message: string;
    toString(): string;
  }

interface IUsePostsStore {
  postsData: IPost;
  postsIsLoading: boolean;
  postsError: Error | null | unknown;
  fetchPosts: (query: string | null) => void;
}

const usePostsStore = create<IUsePostsStore>((set) => ({
  postsData: initIPost,
  postsIsLoading: true,
  postsError: null,
  fetchPosts: async (query: string | null = null) => {
    try {
      set(() => ({ postsIsLoading: true }));
      if(query != null) {        
        PostsService.search(query)
        .then((response: any) => {
          const data = response.data;
          set(() => ({ postsData: data, postsIsLoading: false }));
          console.log(`DATA: ${response.data}`);
        })
        .catch((postsError: Error) => {
          set(() => ({ postsError }));
        });
      } else {
        PostsService.getAll()
        .then((response: any) => {
          const data = response.data;
          set(() => ({ postsData: data, postsIsLoading: false }));
          console.log(`DATA2: ${JSON.stringify(response.data)}`);
        })
        .catch((postsError: Error) => {
          set(() => ({ postsError }));
        });
      }
    } catch (postsError) {
      set(() => ({postsError}));
    }
  },
}));

export default usePostsStore;