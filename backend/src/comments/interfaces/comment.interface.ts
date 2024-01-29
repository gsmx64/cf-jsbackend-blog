import { UsersEntity } from "../../users/entities/users.entity";
import { PostsEntity } from "../../posts/entities/posts.entity";


export interface IComment {
    message: string;
    reaction: string;
    author: UsersEntity;
    post: PostsEntity;
}
