import { UsersEntity } from "../../users/entities/users.entity";
import { CategoriesEntity } from "../../categories/entities/categories.entity";
import { CommentsEntity } from "../../comments/entities/comments.entity";


export interface IPost {
    title: string;
    description: string;
    image: string;
    content: string;
    status: number;
    author: UsersEntity;
    category: CategoriesEntity;
    comments: CommentsEntity[];
}
