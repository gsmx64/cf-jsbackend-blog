export default interface IUser {
  id: string;
  createAt: string;
  updateAt: string;
  username: string;
  email: string;
  password: string;
  status: string;
  role: string;
  karma: number;
  avatar: string;
  firstName: string;
  lastName: string;
  age: number;
  city: string;
  country: string;
  posts?: [string];
  comments?: [string];
}

export interface IUserArray {
  data: {
    id: string;
    createAt: string;
    updateAt: string;
    username: string;
    email: string;
    password: string;
    status: string;
    role: string;
    karma: number;
    avatar: string;
    firstName: string;
    lastName: string;
    age: number;
    city: string;
    country: string;
    posts?: [string];
    comments?: [string];
  },
  meta: {
    itemsPerPage: number,
    totalItems: number,
    currentPage: number,
    totalPages: number,
    sortBy?: [string],
    search?: string,
    searchBy?: [string]
  },
  links: {
    current: string,
    next?: string,
    last?: string
  }
}

export interface IUserRegister {
  username: string;
  password: string;
  repeat_password: string;
  avatar?: string | undefined;
  firstName: string;
  lastName: string;
  email: string;
  age: number;
  city: string;
  country: string;
  termsCheck: boolean;
}

export const initIUser: IUser = {
  id: '',
  createAt: '',
  updateAt: '',
  username: '',
  email: '',
  password: '',
  status: '',
  role: '',
  karma: 0,
  avatar: '',
  firstName: '',
  lastName: '',
  age: 0,
  city: '',
  country: '',
  posts: [''],
  comments: ['']
}

export const initIUserArray: IUserArray = {
  data: {
    id: '',
    createAt: '',
    updateAt: '',
    username: '',
    email: '',
    password: '',
    status: '',
    role: '',
    karma: 0,
    avatar: '',
    firstName: '',
    lastName: '',
    age: 0,
    city: '',
    country: '',
    posts: [''],
    comments: ['']
  },
  meta: {
    itemsPerPage: 0,
    totalItems: 0,
    currentPage: 0,
    totalPages: 0,
    sortBy: [''],
    search: '',
    searchBy: ['']
  },
  links: {
    current: '',
    next: '',
    last: ''
  }
}

export const initIUserRegister: IUserRegister = {
  username: '',
  password: '',
  repeat_password: '',
  avatar: '',
  firstName: '',
  lastName: '',
  email: '',
  age: 0,
  city: '',
  country: '',
  termsCheck: false,
}