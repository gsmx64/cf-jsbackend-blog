import api from "../utils/useApi";
import authHeader from "./auth-header";
import IUser from "../interfaces/user.interface";


const register = (data: IUser) => {
    return api.post<IUser>(`users/create`, { data: data, headers: authHeader() });
};

const update = (id: any, data: IUser) => {
    return api.put<any>(`users/edit/${id}`, { data: data, headers: authHeader() });
};

const remove = (id: any) => {
    return api.delete<any>(`users/delete/${id}`, { headers: authHeader() });
};

const get = (id: any) => {
    return api.get<IUser>(`users/view/${id}`);
};

const getAll = () => {
    return api.get<Array<IUser>>(`users/list`);
};

const search = (query: any) => {
    return api.get<Array<IUser>>(`users/search${query}`, { headers: authHeader() });
};

const filter = (query: any) => {
    return api.get<Array<IUser>>(`users/filter${query}`, { headers: authHeader() });
};

const UsersService = {
    register,
    update,
    remove,
    get,
    getAll,
    search,
    filter
};
  
export default UsersService;