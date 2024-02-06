export default interface IPost {
  title: string;
  description: string;
  image: string;
  content: string;
  status: string;
  author: string;
  category: string;
  comments?: [string];
}

export const initIPost: IPost = {
  title: '',
  description: '',
  image: '',
  content: '',
  status: '',
  author: '',
  category: '',
  comments: ['']
}