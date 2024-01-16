import { UsersEntity } from "src/users/entities/users.entity";
import { PostsEntity } from "src/posts/entities/posts.entity";

export interface IComment {
    comment: string;
    reaction: string;
    author_id: UsersEntity;    
    post_id: PostsEntity;
}
