import { PostsEntity } from "src/posts/entities/posts.entity";

export interface ICategory {
    title: string;
    description: string;
    image: string;
    status: number;
    posts: PostsEntity[];
}
