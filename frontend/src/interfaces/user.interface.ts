export default interface IUser {
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

export const initIUser: IUser = {
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