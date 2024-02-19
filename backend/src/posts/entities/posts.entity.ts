import { Entity, Column, OneToMany, ManyToOne } from "typeorm";

import { IPost } from "../interfaces/post.interface";
import { BaseEntity } from "../../config/base.entity";
import { CategoriesEntity } from "../../categories/entities/categories.entity";
import { UsersEntity } from "../../users/entities/users.entity";
import { CommentsEntity } from "../../comments/entities/comments.entity";
import { PUBLISH_STATUS } from "../../constants/publish.status";


/**
 * Represents the PostsEntity class, which is an entity in the database for storing post information.
 */
@Entity({ name: 'posts' })
export class PostsEntity extends BaseEntity implements IPost {
    /**
     * The title of the post.
     */
    @Column({
        type: 'varchar',
        width: 100,
        unique: true
    })
    title: string;

    /**
     * The description of the post.
     */
    @Column({
        type: 'varchar',
        width: 255
    })
    description: string;

    /**
     * The image URL of the post.
     */
    @Column({
        type: 'text'
    })
    image: string;

    /**
     * The content of the post.
     */
    @Column({
        type: 'text'
    })
    content: string;

    /**
     * The status of the post (published or unpublished).
     */
    @Column({
        type: 'enum',
        enum: PUBLISH_STATUS,
        default: PUBLISH_STATUS.UNPUBLISHED
    })
    status: PUBLISH_STATUS;

    /**
     * The author of the post.
     */
    @ManyToOne(()=>UsersEntity, (author)=>author.posts)
    author: UsersEntity;

    /**
     * The category of the post.
     */
    @ManyToOne(()=>CategoriesEntity, (category)=>category.posts)
    category: CategoriesEntity;

    /**
     * The comments associated with the post.
     */
    @OneToMany(()=>CommentsEntity, (comments)=>comments.post)
    comments: CommentsEntity[];
}
