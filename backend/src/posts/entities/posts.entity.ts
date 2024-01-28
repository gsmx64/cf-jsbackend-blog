import { Entity, Column, OneToMany, ManyToOne } from "typeorm";

import { IPost } from "../interfaces/post.interface";
import { BaseEntity } from "../../config/base.entity";
import { CategoriesEntity } from "../../categories/entities/categories.entity";
import { UsersEntity } from "../../users/entities/users.entity";
import { CommentsEntity } from "../../comments/entities/comments.entity";


@Entity({ name: 'posts' })
export class PostsEntity extends BaseEntity implements IPost {
    @Column({
        unique: true
    })
    title: string;

    @Column()
    description: string;

    @Column()
    image: string;

    @Column()
    content: string;

    @Column()
    status: number;

    @ManyToOne(()=>UsersEntity, (author)=>author.posts)
    author: UsersEntity;

    @ManyToOne(()=>CategoriesEntity, (category)=>category.posts)
    category: CategoriesEntity;

    @OneToMany(()=>CommentsEntity, (comments)=>comments.post)
    comments: CommentsEntity[];
}
