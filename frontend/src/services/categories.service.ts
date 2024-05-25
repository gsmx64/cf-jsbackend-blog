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

const update = (id: string, data: any) => {
  return api.put<any>(
    `categories/edit/${id}`,
    data,
    { headers: AuthService.authHeader() }
  );
};

const remove = (id: string) => {
  return api.delete<any>(
    `categories/delete/${id}`,
    { headers: AuthService.authHeader() }
  );
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