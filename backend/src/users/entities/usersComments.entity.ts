import { Entity, ManyToOne } from "typeorm";
import { BaseEntity } from "../../config/base.entity";
import { UsersEntity } from "./users.entity";
import { CommentsEntity } from "../../comments/entities/comments.entity";

@Entity({ name: 'users_comments' })
export class UsersCommentsEntity extends BaseEntity {
    @ManyToOne(()=>UsersEntity, (user)=>user.commentsIncludes)
    user: UsersEntity;

    @ManyToOne(()=>CommentsEntity, (comment)=>comment.usersIncludes)
    comment: CommentsEntity
}
