export default interface IPost {
  id: string;
  createAt: string;
  updateAt: string;
  title: string;
  description: string;
  image: string;
  content: string;
  status: string;
  author: string;
  category: string;
  comments?: [string]
}

export interface IPostCreate {
  title: string;
  description: string;
  image: string;
  content: string;
  category: string;
}

export interface IPostArray {
  data: {
    id: string;
    createAt: string;
    updateAt: string;
    title: string;
    description: string;
    image: string;
    content: string;
    status: string;
    author: string;
    category: string;
    comments?: [string]
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

export const initIPost: IPost = {
  id: '',
  createAt: '',
  updateAt: '',
  title: '',
  description: '',
  image: '',
  content: '',
  status: '',
  author: '',
  category: '',
  comments: ['']
}

export const initIPostCreate: IPostCreate = {
  title: '',
  description: '',
  image: '',
  content: '',
  category: '',
}

export const initIPostArray: IPostArray = {
  data: { 
    id: '',
    createAt: '',
    updateAt: '',
    title: '',
    description: '',
    image: '',
    content: '',
    status: '',
    author: '',
    category: '',
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