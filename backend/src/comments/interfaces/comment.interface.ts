import { UsersEntity } from "../../users/entities/users.entity";
import { PostsEntity } from "../../posts/entities/posts.entity";

/**
 * Represents a comment.
 */
export interface IComment {
    /**
     * The comment message.
     */
    message: string;
    /**
     * The author of the comment.
     */
    author: UsersEntity;
    /**
     * The post associated with the comment.
     */
    post: PostsEntity;
}
