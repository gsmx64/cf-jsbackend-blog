import api from "../utils/useApi";
import AuthService from "./auth.service";
import IPost, { initIPost, initIPostArray, IPostCreate } from "../interfaces/post.interface";


const create = (data: IPostCreate) => {
  return api.post<IPostCreate>(
    `posts/create`,
    data,
    { headers: AuthService.authHeader() }
  );
};

const update = (id: string | undefined, data: any) => {
  return api.put<any>(
    `posts/edit/${id}`,
    data,
    { headers: AuthService.authHeader() }
  );
};

const remove = (id: string) => {
  return api.delete<any>(
    `posts/delete/${id}`,
    { headers: AuthService.authHeader() }
  );
};

const get = (id: string | undefined) => {
  return (id != undefined) ? api.get<IPost>(
    `posts/view/${id}`,
    { headers: AuthService.authHeader() }
  ) : initIPost as any;
};

const getAll = (currentPage: number | null = null, itemsPerPage: number | null = null) => {
  const currentPageQuery = (currentPage != null) ? `/?page=${currentPage}` : ``;
  const itemsPerPageQuery = (itemsPerPage != null) ? `&limit=${itemsPerPage}` : ``;

  return api.get<Array<IPost>>(
    `posts/list${currentPageQuery}${itemsPerPageQuery}`,
    { headers: AuthService.authHeader() }
  );
};

const getUserPosts = (id: string | undefined, limit: number | null = null) => {
  const limitQuery = (limit != null) ? `?limit=${limit}` : ``;

  return (id != undefined) ? api.get<Array<IPost>>(
    `posts/user/${id}${limitQuery}`, { headers: AuthService.authHeader() }) : initIPostArray as any;
};

const findByTitle = (title: string | undefined) => {
  return (title != undefined) ? api.get<Array<IPost>>(
    `posts/search?sortBy=id%3ADESC&search=${title}&searchBy=title&select=title`,
    { headers: AuthService.authHeader() }
  ) : initIPostArray as any;
};

const search = (query: any) => {
  return api.get<Array<IPost>>(
    `posts/search${query}`,
    { headers: AuthService.authHeader() }
  );
};

const filter = (query: any) => {
  return api.get<Array<IPost>>(
    `posts/filter${query}`,
    { headers: AuthService.authHeader() }
  );
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