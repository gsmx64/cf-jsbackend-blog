import { UsersEntity } from "../../users/entities/users.entity";
import { CategoriesEntity } from "../../categories/entities/categories.entity";
import { CommentsEntity } from "../../comments/entities/comments.entity";


/**
 * Represents a post in the blog.
 */
export interface IPost {
    /**
     * The title of the post.
     */
    title: string;
    /**
     * The description of the post.
     */
    description: string;
    /**
     * The image URL of the post.
     */
    image: string;
    /**
     * The content of the post.
     */
    content: string;
    /**
     * The status of the post.
     */
    status: string;
    /**
     * The author of the post.
     */
    author: UsersEntity;
    /**
     * The category of the post.
     */
    category: CategoriesEntity;
    /**
     * The comments on the post.
     */
    comments: CommentsEntity[];
}
