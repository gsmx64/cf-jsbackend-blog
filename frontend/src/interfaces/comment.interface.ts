export default interface IComment {
  id: string;
  createAt: string;
  updateAt: string;
  message: string;
  author: string;
  post: string;
}

export interface ICommentCreate {
  message: string;
  post: string;
}

export interface ICommentArray {
  data: {
    id: string;
    createAt: string;
    updateAt: string;
    message: string;
    author: string;
    post: [string];
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

export const initIComment: IComment = {
  id: '',
  createAt: '',
  updateAt: '',
  message: '',
  author: '',
  post: ''
}

export const initICommentCreate: ICommentCreate = {
  message: '',
  post: '',
}

export const initICommentArray: ICommentArray = {
  data: {
    id: '',
    createAt: '',
    updateAt: '',
    message: '',
    author: '',
    post: ['']
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