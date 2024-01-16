import { CategoriesEntity } from "src/categories/entities/categories.entity";
import { CommentsEntity } from "src/comments/entities/comments.entity";
import { UsersEntity } from "src/users/entities/users.entity";

export interface IPost {
    title: string;
    description: string;
    image: string;
    content: string;
    status: number;
    author_id: UsersEntity;
    category_id: CategoriesEntity;
    comments: CommentsEntity[];
}
