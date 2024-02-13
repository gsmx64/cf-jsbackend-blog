import api from "../utils/useApi";
import AuthService from "./auth.service";
import IComment, { ICommentArray, initIComment,
  initICommentArray } from "../interfaces/comment.interface";


const create = (data: IComment) => {
  return api.post<IComment>(
    `comments/create`, { data: data, headers: AuthService.authHeader() });
};

const update = (id: string, data: IComment) => {
  return api.put<any>(
    `comments/edit/${id}`, { data: data, headers: AuthService.authHeader() });
};

const remove = (id: string) => {
  return api.delete<any>(
    `comments/delete/${id}`, { headers: AuthService.authHeader() });
};

const get = (id: string | undefined) => {
  return (id != undefined) ? api.get<IComment>(
    `comments/view/${id}`) : initIComment as any;
};

const getAll = () => {
  return api.get<Array<IComment>>(`comments/list`);
};

const getUserComments = (id: string | undefined, limit: number | null = null) => {
  const limitQuery = (limit != null) ? `?limit=${limit}` : ``;
  return (id != undefined) ? api.get<ICommentArray>(
    `comments/user/${id}${limitQuery}`) : initICommentArray as any;
};

const search = (query: any) => {
  return api.get<Array<IComment>>(
    `comments/search${query}`, { headers: AuthService.authHeader() });
};

const filter = (query: any) => {
  return api.get<Array<IComment>>(
    `comments/filter${query}`, { headers: AuthService.authHeader() });
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