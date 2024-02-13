import api from "../utils/useApi";
import AuthService from "./auth.service";
import IUser from "../interfaces/user.interface";


const register = (data: IUser) => {
  return api.post<IUser>(`users/register`, { data: data });
};

const update = (id: string, data: IUser) => {
  return api.put<any>(`users/edit/${id}`, { data: data, headers: AuthService.authHeader() });
};

const remove = (id: string) => {
  return api.delete<any>(`users/delete/${id}`, { headers: AuthService.authHeader() });
};

const get = (id: string | undefined) => {
  return api.get<IUser>(`users/view/${id}`, { headers: AuthService.authHeader() });
};

const getAll = () => {
  return api.get<Array<IUser>>(`users/list`);
};

const search = (query: any) => {
  return api.get<Array<IUser>>(`users/search${query}`, { headers: AuthService.authHeader() });
};

const filter = (query: any) => {
  return api.get<Array<IUser>>(`users/filter${query}`, { headers: AuthService.authHeader() });
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