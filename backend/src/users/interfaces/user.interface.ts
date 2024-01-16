import { CommentsEntity } from "src/comments/entities/comments.entity";
import { PostsEntity } from "src/posts/entities/posts.entity";

export interface IUser {
    username: string;
    email: string;
    password: string;
    status: number;
    role: string;
    karma: string;
    avatar: string;
    firstName: string;
    lastName: string;
    age: number;
    city: string;
    country: string;
    posts: PostsEntity[];
    comments: CommentsEntity[];
}
