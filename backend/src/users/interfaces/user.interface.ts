import { PostsEntity } from "../../posts/entities/posts.entity";
import { CommentsEntity } from "../../comments/entities/comments.entity";

/**
 * Represents a user in the system.
 */
export interface IUser {
    /**
     * The username of the user.
     */
    username: string;
    /**
     * The email address of the user.
     */
    email: string;
    /**
     * The password of the user.
     */
    password: string;
    /**
     * The status of the user.
     */
    status: string;
    /**
     * The role of the user.
     */
    role: string;
    /**
     * The karma points of the user.
     */
    karma: number;
    /**
     * The avatar URL of the user.
     */
    avatar: string;
    /**
     * The first name of the user.
     */
    firstName: string;
    /**
     * The last name of the user.
     */
    lastName: string;
    /**
     * The age of the user.
     */
    age: number;
    /**
     * The city of the user.
     */
    city: string;
    /**
     * The country of the user.
     */
    country: string;
    /**
     * The posts created by the user.
     */
    posts: PostsEntity[];
    /**
     * The comments made by the user.
     */
    comments: CommentsEntity[];
}