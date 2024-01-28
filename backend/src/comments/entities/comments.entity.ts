import { Entity, Column, OneToMany, ManyToOne } from "typeorm";

import { IComment } from "../interfaces/comment.interface";
import { BaseEntity } from "../../config/base.entity";
import { UsersEntity } from "../../users/entities/users.entity";
import { PostsEntity } from "../../posts/entities/posts.entity";


@Entity({ name: 'comments' })
export class CommentsEntity extends BaseEntity implements IComment {
    @Column()
    message: string;

    @Column()
    reaction: string;

    @ManyToOne(()=>UsersEntity, (author)=>author.comments)
    author: UsersEntity;

    @ManyToOne(()=>PostsEntity, (post)=>post.comments)
    post: PostsEntity;
}
