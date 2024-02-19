import { Entity, Column, OneToMany, ManyToOne } from "typeorm";

import { IComment } from "../interfaces/comment.interface";
import { BaseEntity } from "../../config/base.entity";
import { UsersEntity } from "../../users/entities/users.entity";
import { PostsEntity } from "../../posts/entities/posts.entity";


/**
 * Represents the CommentsEntity class, which is an entity in the database for storing comment information.
 */
@Entity({ name: 'comments' })
export class CommentsEntity extends BaseEntity implements IComment {
    /**
     * The message of the comment.
     */
    @Column({
        type: 'varchar',
        width: 255
    })
    message: string;

    /**
     * The reaction of the comment.
     */
    @Column({
        type: 'varchar',
        width: 10
    })
    reaction: string;

    /**
     * The author of the comment.
     */
    @ManyToOne(()=>UsersEntity, (author)=>author.comments)
    author: UsersEntity;

    /**
     * The post that the comment belongs to.
     */
    @ManyToOne(()=>PostsEntity, (post)=>post.comments)
    post: PostsEntity;
}