import { Entity, Column, OneToMany, ManyToOne } from "typeorm";

import { IPost } from "../interfaces/post.interface";
import { BaseEntity } from "../../config/base.entity";
import { CategoriesEntity } from "../../categories/entities/categories.entity";
import { UsersEntity } from "../../users/entities/users.entity";
import { CommentsEntity } from "../../comments/entities/comments.entity";
import { PUBLISH_STATUS } from "../../constants/publish.status";


@Entity({ name: 'posts' })
export class PostsEntity extends BaseEntity implements IPost {
    @Column({
        type: 'varchar',
        width: 100,
        unique: true
    })
    title: string;

    @Column({
        type: 'varchar',
        width: 255
    })
    description: string;

    @Column({
        type: 'text'
    })
    image: string;

    @Column({
        type: 'text'
    })
    content: string;

    @Column({
        type: 'enum',
        enum: PUBLISH_STATUS,
        default: PUBLISH_STATUS.UNPUBLISHED
    })
    status: PUBLISH_STATUS;

    @ManyToOne(()=>UsersEntity, (author)=>author.posts)
    author: UsersEntity;

    @ManyToOne(()=>CategoriesEntity, (category)=>category.posts)
    category: CategoriesEntity;

    @OneToMany(()=>CommentsEntity, (comments)=>comments.post)
    comments: CommentsEntity[];
}
