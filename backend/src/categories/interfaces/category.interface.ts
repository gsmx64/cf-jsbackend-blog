import { UsersEntity } from "../../users/entities/users.entity";
import { PostsEntity } from "../../posts/entities/posts.entity";


/**
 * Represents a category in the blog.
 */
export interface ICategory {
    /**
     * The title of the category.
     */
    title: string;
    /**
     * The description of the category.
     */
    description: string;
    /**
     * The image URL of the category.
     */
    image: string;
    /**
     * The status of the category.
     */
    status: string;
    /**
     * The author of the category.
     */
    author: UsersEntity;
    /**
     * The posts associated with the category.
     */
    posts: PostsEntity[];
}
