import api from "../utils/useApi";
import UsersService from "./users.service";
import { IUserRegister } from "../interfaces/user.interface";
import { AuthBody } from "../interfaces/auth.interface";


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

const isLoggedIn = () => {
  return (localStorage.getItem('user') != null);
}

const userRole = () => {
  const userStr = localStorage.getItem('user');
  if (userStr) {
    const user = JSON.parse(userStr);
    return user.user.role;
  }
}

const getCurrentUser = () => {
  const userStr = localStorage.getItem('user');
  if (userStr) return JSON.parse(userStr);

  return null;
};

const AuthService = {
  authHeader,
  register,
  login,
  logout,
  isLoggedIn,
  userRole,
  getCurrentUser
};

export default AuthService;