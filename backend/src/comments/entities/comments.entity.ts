import { Entity, Column, OneToMany, ManyToOne } from "typeorm";

import { IComment } from "../interfaces/comment.interface";
import { BaseEntity } from "../../config/base.entity";
import { UsersEntity } from "../../users/entities/users.entity";
import { PostsEntity } from "../../posts/entities/posts.entity";


@Entity({ name: 'comments' })
export class CommentsEntity extends BaseEntity implements IComment {
    @Column({
        type: 'varchar',
        width: 255
    })
    message: string;

    @Column({
        type: 'varchar',
        width: 10
    })
    reaction: string;

    @ManyToOne(()=>UsersEntity, (author)=>author.comments)
    author: UsersEntity;

    @ManyToOne(()=>PostsEntity, (post)=>post.comments)
    post: PostsEntity;
}
