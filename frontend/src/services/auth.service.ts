import api from "../utils/useApi";
import UsersService from "./users.service";
import { IUserRegister } from "../interfaces/user.interface";
import { AuthBody } from "../interfaces/auth.interface";
import { AxiosResponse } from "axios";


const authHeader = () => {
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

const login = async (username: AuthBody | string, password: AuthBody | string) => {
  return api
    .post('auth/login', {
      username,
      password,
    })
    .then((response: any) => {
      if (response.data.access_token) {
        localStorage.setItem('user', JSON.stringify(response.data));
      }
      return response.data;
    });
};

const logout = () => {
  localStorage.removeItem('user');
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

const isLoggedIn = () => {
  return (localStorage.getItem('user') != null);
}

const isRoleAuthorized = async (roles: Array<string>) => {
  const role = await userRole();
  return roles.includes(role);
}

const isAdmin = async () => {
  const role = await userRole();
  return (role === 'ADMIN');
}

const getCurrentUserId = () => {
  if (isLoggedIn()) {
    const userStr = localStorage.getItem('user');
    if (userStr) {
      const user = JSON.parse(userStr);
      return user.user.id;
    }
  }

  return null;
};

const getCurrentUser = () => {
  if (isLoggedIn()) {
    const userStr = localStorage.getItem('user');
    if (userStr) {
      const user = JSON.parse(userStr);
      return UsersService.get(user.user.id);
    }
  }

  return undefined;
};

const AuthService = {
  authHeader,
  register,
  login,
  logout,
  isLoggedIn,
  isRoleAuthorized,
  isAdmin,
  userRole,
  getCurrentUserId,
  getCurrentUser
};

export default AuthService;