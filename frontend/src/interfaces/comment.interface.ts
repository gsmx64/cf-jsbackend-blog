export default interface IComment {
  message: string;
  reaction: string;
  author: string;
  post: string;
}

export const initIComment: IComment = {
  message: '',
  reaction: '',
  author: '',
  post: ''
}