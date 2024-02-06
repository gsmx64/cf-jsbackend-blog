import api from "../utils/useApi";
import authHeader from "./auth-header";
import ICategory from "../interfaces/category.interface";


const create = (data: ICategory) => {
    return api.post<ICategory>(`categories/create`, { data: data, headers: authHeader() });
};

const update = (id: any, data: ICategory) => {
    return api.put<any>(`categories/edit/${id}`, { data: data, headers: authHeader() });
};

const remove = (id: any) => {
    return api.delete<any>(`categories/delete/${id}`, { headers: authHeader() });
};

const get = (id: any) => {
    return api.get<ICategory>(`categories/view/${id}`);
};

const getAll = () => {
    return api.get<Array<ICategory>>(`categories/list`);
};

const search = (query: any) => {
    return api.get<Array<ICategory>>(`categories/search${query}`, { headers: authHeader() });
};

const filter = (query: any) => {
    return api.get<Array<ICategory>>(`categories/filter${query}`, { headers: authHeader() });
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