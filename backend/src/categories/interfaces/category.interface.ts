import { UsersEntity } from "../../users/entities/users.entity";
import { PostsEntity } from "../../posts/entities/posts.entity";


export interface ICategory {
    title: string;
    description: string;
    image: string;
    status: string;
    author: UsersEntity;
    posts: PostsEntity[];
}
