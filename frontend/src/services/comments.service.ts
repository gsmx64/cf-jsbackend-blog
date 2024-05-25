import api from "../utils/useApi";
import AuthService from "./auth.service";
import IComment, { ICommentCreate, initIComment,
  initICommentArray } from "../interfaces/comment.interface";


const create = (data: ICommentCreate) => {
  return api.post<ICommentCreate>(
    `comments/create`,
    data,
    { headers: AuthService.authHeader() }
  );
};

const update = (id: string, data: any) => {
  return api.put<any>(
    `comments/edit/${id}`,
    data,
    { headers: AuthService.authHeader() }
  );
};

const remove = (id: string) => {
  return api.delete<any>(
    `comments/delete/${id}`,
    { headers: AuthService.authHeader() }
  );
};

const get = (id: string | undefined) => {
  return (id != undefined) ? api.get<IComment>(
    `comments/view/${id}`,
    { headers: AuthService.authHeader() }
  ) : initIComment as any;
};

const getAll = (currentPage: number | null = null, itemsPerPage: number | null = null) => {
  const currentPageQuery = (currentPage != null) ? `/?page=${currentPage}` : ``;
  const itemsPerPageQuery = (itemsPerPage != null) ? `&limit=${itemsPerPage}` : ``;

  return api.get<Array<IComment>>(
    `comments/list${currentPageQuery}${itemsPerPageQuery}`,
    { headers: AuthService.authHeader() }
  );
};

const getUserComments = (id: string | undefined, limit: number | null = null) => {
  const limitQuery = (limit != null) ? `?limit=${limit}` : ``;

  return (id != undefined) ? api.get<Array<IComment>>(
    `comments/user/${id}${limitQuery}`,
    { headers: AuthService.authHeader() }
  ) : initICommentArray as any;
};

const search = (query: any) => {
  return api.get<Array<IComment>>(
    `comments/search${query}`,
    { headers: AuthService.authHeader() }
  );
};

const filter = (query: any) => {
  return api.get<Array<IComment>>(
    `comments/filter${query}`,
    { headers: AuthService.authHeader() }
  );
};

const CommentsService = {
  create,
  update,
  remove,
  get,
  getAll,
  getUserComments,
  search,
  filter
};
  
export default CommentsService;