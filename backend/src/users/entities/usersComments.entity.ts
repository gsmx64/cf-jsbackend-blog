import { Entity, Column, ManyToOne } from "typeorm";
import { ACCESS_LEVEL } from "../../constants/roles";
import { BaseEntity } from "../../config/base.entity";
import { UsersEntity } from "./users.entity";
import { CommentsEntity } from "../../comments/entities/comments.entity";

@Entity({ name: 'users_comments' })
export class UsersCommentsEntity extends BaseEntity {
    @Column({
        type: 'enum',
        enum: ACCESS_LEVEL,
    })
    commentsId: number;

    @ManyToOne(()=>UsersEntity, (user)=>user.commentsIncludes)
    user: UsersEntity;

    @ManyToOne(()=>CommentsEntity, (comment)=>comment.usersIncludes)
    comment: CommentsEntity
}
