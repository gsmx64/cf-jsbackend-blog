import api from "../utils/useApi";
import AuthService from "./auth.service";
import IPost, { initIPost, initIPostArray } from "../interfaces/post.interface";


const create = (data: IPost) => {
  return api.post<IPost>(
    `posts/create`, { data: data, headers: AuthService.authHeader() });
};

const update = (id: string, data: IPost) => {
  return api.put<any>(
    `posts/edit/${id}`, { data: data, headers: AuthService.authHeader() });
};

const remove = (id: string) => {
  return api.delete<any>(
    `posts/delete/${id}`, { headers: AuthService.authHeader() });
};

const get = (id: string | undefined) => {
  return (id != undefined) ? api.get<IPost>(
    `posts/view/${id}`) : initIPost as any;
};

const getAll = () => {
  return api.get<Array<IPost>>(`posts/list`);
};

const getUserPosts = (id: string | undefined, limit: number | null = null) => {
  const limitQuery = (limit != null) ? `?limit=${limit}` : ``;
  return (id != undefined) ? api.get<Array<IPost>>(
    `posts/user/${id}${limitQuery}`) : initIPostArray as any;
};

const findByTitle = (title: string | undefined) => {
  return (title != undefined) ? api.get<Array<IPost>>(
    `posts/search?sortBy=id%3ADESC&search=${title}&searchBy=title&select=title`,
    { headers: AuthService.authHeader() }
  ) : initIPostArray as any;
};

const search = (query: any) => {
  return api.get<Array<IPost>>(
    `posts/search${query}`, { headers: AuthService.authHeader() });
};

const filter = (query: any) => {
  return api.get<Array<IPost>>(
    `posts/filter${query}`, { headers: AuthService.authHeader() });
};

const PostsService = {
  create,
  update,
  remove,
  get,
  getAll,
  getUserPosts,
  findByTitle,
  search,
  filter
};
  
export default PostsService;