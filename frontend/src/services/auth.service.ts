import api from "../utils/useApi";
import UsersService from "./users.service";
import IUser, { IUserPassword, IUserRegister } from "../interfaces/user.interface";
import { AxiosResponse } from "axios";


const authHeader = () => {
  const userStr = localStorage.getItem('user');
  let user = null;

  if (userStr)
  user = JSON.parse(userStr);

  if (user && user.access_token) {
      return { 'access_token': `${user.access_token}`, "Content-Type": "application/json;charset=UTF-8" };
  } else {
      return { 'access_token': '', "Content-Type": "application/json;charset=UTF-8" };
  }
}

const authHeaderFetch = () => {
  const userStr = localStorage.getItem('user');
  let user = null;

  if (userStr)
  user = JSON.parse(userStr);

  if (user && user.access_token) {
      return { 'access_token': `${user.access_token}` };
  } else {
      return { 'access_token': '' };
  }
}

const register = (body: IUserRegister) => {
    return UsersService.register(body);
};

const login = (username: string, password: string) => {
  return api.post<any>(
    'auth/login',
    { username, password }
  );
};

const logout = () => {
  localStorage.removeItem('user');
};

const changeOwnPassword = (data: IUserPassword) => {
  const id = AuthService.getCurrentUserId();
  return api.put(
    `users/password/${id}`,
    data,
    { headers: AuthService.authHeader() }
  );
};

const resetPassword = (id: string | undefined, data: IUserPassword) => {
  return (id != undefined) ? api.put(
    `users/password/${id}`,
    data,
    { headers: AuthService.authHeader() }
  ) : Promise.reject('User ID is required');;
};

const userRole = () => {
  const userStr = localStorage.getItem('user');
  if (userStr) {
    const user = JSON.parse(userStr);
    return api
    .get(`auth/role/${user.user.id}`)
    .then((response: AxiosResponse) => {
      return response.data;
    })
    .catch(() => {
      return 'NONE';
    });
  } else {
    return 'NONE';
  }
}

const changeOwnAvatar = (avatar: string) => {
  const id = AuthService.getCurrentUserId();
  return api.put(
    `users/edit/${id}`,
    { 'avatar': `${avatar}` },
    { headers: AuthService.authHeader() }
  );
};

const isLoggedIn = () => {
  return (localStorage.getItem('user') != null);
}

const isRoleAuthorized = async (roles: Array<string>) => {
  const role = await AuthService.userRole();
  return roles.includes(role);
}

const isAdmin = async () => {
  const role = await AuthService.userRole();
  return (role === 'ADMIN');
}

const getCurrentUserId = () => {
  if (AuthService.isLoggedIn()) {
    const userStr = localStorage.getItem('user');
    if (userStr) {
      const user = JSON.parse(userStr);
      return user.user.id;
    }
  }

  return null;
};

const getCurrentUser = () => {
  return api.get<IUser>(
    'users/profile',
    { headers: AuthService.authHeader() }
  );
};

const AuthService = {
  authHeader,
  authHeaderFetch,
  register,
  login,
  logout,
  changeOwnPassword,
  resetPassword,
  changeOwnAvatar,
  isLoggedIn,
  isRoleAuthorized,
  isAdmin,
  userRole,
  getCurrentUserId,
  getCurrentUser
};

export default AuthService;