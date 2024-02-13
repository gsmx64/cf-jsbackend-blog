import api from "../utils/useApi";
import UsersService from "./users.service";
import IUser from "../interfaces/user.interface";
import { AuthBody } from "../interfaces/auth.interface";


const authHeader = () => {
  const userStr = localStorage.getItem('user');

  let user = null;

  if (userStr)
  user = JSON.parse(userStr);

  console.log(user.access_token);

  if (user && user.access_token) {
      return { 'access_token':`${user.access_token}` };
  } else {
      return { access_token: user.access_token };
  }
}

const register = (body: IUser) => {
    return UsersService.register(body);
};

const login = async (username: AuthBody, password: AuthBody) => {
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

const getCurrentUser = () => { //AuthResponse
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
  getCurrentUser
};

export default AuthService;