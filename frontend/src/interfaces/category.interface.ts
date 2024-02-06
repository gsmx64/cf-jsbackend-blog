export default interface ICategory {
  title: string;
  description: string;
  image: string;
  status: string;
  author: string;
  posts?: [string];
}

export const initICategory: ICategory = {
  title: '',
  description: '',
  image: '',
  status: '',
  author: '',
  posts: ['']
}