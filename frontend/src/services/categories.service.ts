import api from "../utils/useApi";
import AuthService from "./auth.service";
import ICategory, { initICategory } from "../interfaces/category.interface";


const create = (data: ICategory) => {
  return api.post<ICategory>(
    `categories/create`, { data: data, headers: AuthService.authHeader() });
};

const update = (id: string, data: ICategory) => {
  return api.put<any>(
    `categories/edit/${id}`, { data: data, headers: AuthService.authHeader() });
};

const remove = (id: string) => {
  return api.delete<any>(
    `categories/delete/${id}`, { headers: AuthService.authHeader() });
};

const get = (id: string | undefined) => {
  return (id != undefined) ? api.get<ICategory>(
    `categories/view/${id}`) : initICategory as any;
};

const getAll = () => {
  return api.get<Array<ICategory>>(`categories/list`);
};

const search = (query: any) => {
  return api.get<Array<ICategory>>(
    `categories/search${query}`, { headers: AuthService.authHeader() });
};

const filter = (query: any) => {
  return api.get<Array<ICategory>>(
    `categories/filter${query}`, { headers: AuthService.authHeader() });
};

const CategoriesService = {
  create,
  update,
  remove,
  get,
  getAll,
  search,
  filter
};
  
export default CategoriesService;