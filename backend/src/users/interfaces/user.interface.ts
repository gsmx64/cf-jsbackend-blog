import { PostsEntity } from "../../posts/entities/posts.entity";
import { CommentsEntity } from "../../comments/entities/comments.entity";


export interface IUser {
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
    posts: PostsEntity[];
    comments: CommentsEntity[];
}