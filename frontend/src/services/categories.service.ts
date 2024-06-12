import api from "../utils/useApi";
import AuthService from "./auth.service";
import ICategory, { ICategoryCreate, initICategory } from "../interfaces/category.interface";


const create = (data: ICategoryCreate) => {
  return api.post<ICategoryCreate>(
    'categories/create',
    data,
    { headers: AuthService.authHeader() }
  );
};

const update = (id: string | undefined, data: any) => {
  return (id != undefined) ? api.put<any>(
    `categories/edit/${id}`,
    data,
    { headers: AuthService.authHeader() }
  ) : Promise.reject('Category ID is required');
};

const remove = (id: string | undefined) => {
  return (id != undefined) ? api.delete<any>(
    `categories/delete/${id}`,
    { headers: AuthService.authHeader() }
  ) : Promise.reject('Category ID is required');
};

const get = (id: string | undefined) => {
  return (id != undefined) ? api.get<ICategory>(
    `categories/view/${id}`,
    { headers: AuthService.authHeader() }
  ) : initICategory as any;
};

const getAll = (currentPage: number | null = null, itemsPerPage: number | null = null) => {
  const currentPageQuery = (currentPage != null) ? `/?page=${currentPage}` : ``;
  const itemsPerPageQuery = (itemsPerPage != null) ? `&limit=${itemsPerPage}` : ``;

  return api.get<Array<ICategory>>(
    `categories/list${currentPageQuery}${itemsPerPageQuery}`,
    { headers: AuthService.authHeader() }
  );
};

const search = (query: any) => {
  return api.get<Array<ICategory>>(
    `categories/search${query}`,
    { headers: AuthService.authHeader() }
  );
};

const filter = (query: any) => {
  return api.get<Array<ICategory>>(
    `categories/filter${query}`,
    { headers: AuthService.authHeader() }
  );
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