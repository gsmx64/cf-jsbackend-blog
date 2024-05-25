export default interface ICategory {
  id: string;
  createAt: string;
  updateAt: string;
  title: string;
  description: string;
  image: string;
  status: string;
  author: string;
  posts?: [string];
}

export interface ICategoryCreate {
  title: string;
  description: string;
  image: string;
}

export interface ICategoryArray {
  data: {
    id: string;
    createAt: string;
    updateAt: string;
    title: string;
    description: string;
    image: string;
    status: string;
    author: string;
    posts?: [string];
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

export const initICategory: ICategory = {
  id: '',
  createAt: '',
  updateAt: '',
  title: '',
  description: '',
  image: '',
  status: '',
  author: '',
  posts: ['']
}

export const initICategoryCreate: ICategoryCreate = {
  title: '',
  description: '',
  image: '',
}

export const initICategoryArray: ICategoryArray = {
  data: { 
    id: '',
    createAt: '',
    updateAt: '',
    title: '',
    description: '',
    image: '',
    status: '',
    author: '',
    posts: ['']
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