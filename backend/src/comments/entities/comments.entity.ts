import { Entity, Column, OneToMany } from "typeorm";
import { IComment } from "../../interfaces/comment.interface";
import { BaseEntity } from "../../config/base.entity";
import { UsersCommentsEntity } from "../../users/entities/usersComments.entity";

@Entity({ name: 'comments' })
export class CommentsEntity extends BaseEntity implements IComment {
    @Column()
    comment: string;

    @Column()
    author_id: number;

    @Column()
    reaction: string;

    @OneToMany(()=>UsersCommentsEntity, (usersComments)=>usersComments.comment)
    usersIncludes: UsersCommentsEntity[]
}
