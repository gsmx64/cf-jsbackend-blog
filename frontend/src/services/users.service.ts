import api from "../utils/useApi";
import AuthService from "./auth.service";
import IUser, { initIUser, IUserRegister } from "../interfaces/user.interface";


const register = (data: IUserRegister) => {
  return api.post<IUserRegister>(
    `users/register`,
    data
  );
};

const update = (id: string, data: any) => {
  return api.put<any>(
    `users/edit/${id}`,
    data,
    { headers: AuthService.authHeader() }
  );
};

const remove = (id: string) => {
  return api.delete<any>(
    `users/delete/${id}`,
    { headers: AuthService.authHeader() }
  );
};

const get = (id: string | undefined) => {
  return (id != undefined) ? api.get<IUser>(
    `users/view/${id}`,
    { headers: AuthService.authHeader() }
  ) : initIUser as any;
};

const getAll = (currentPage: number | null = null, itemsPerPage: number | null = null) => {
  const currentPageQuery = (currentPage != null) ? `/?page=${currentPage}` : ``;
  const itemsPerPageQuery = (itemsPerPage != null) ? `&limit=${itemsPerPage}` : ``;

  return api.get<Array<IUser>>(`users/list${currentPageQuery}${itemsPerPageQuery}`, { headers: AuthService.authHeader() });
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