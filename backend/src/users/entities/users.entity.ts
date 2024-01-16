import { Entity, Column, OneToMany } from "typeorm";
import { Exclude } from "class-transformer";
import { ROLES } from "../../constants/roles";
import { IUser } from "../interfaces/user.interface";
import { BaseEntity } from "../../config/base.entity";
import { PostsEntity } from "../../posts/entities/posts.entity";
import { CommentsEntity } from "../../comments/entities/comments.entity";

@Entity({ name: 'users' })
export class UsersEntity extends BaseEntity implements IUser {
    @Column({
        unique: true
    })
    username: string;

    @Column({
        unique: true
    })
    email: string;

    @Exclude()
    @Column()
    password: string;

    @Column()
    status: number;
    
    @Column({
        type: 'enum',
        enum: ROLES
    })
    role: ROLES;

    @Column()
    karma: string;

    @Column()
    avatar: string;

    @Column()
    firstName: string;

    @Column()
    lastName: string;

    @Column()
    age: number;

    @Column()
    city: string;

    @Column()
    country: string;

    @OneToMany(()=>PostsEntity, (post)=>post.author_id)
    posts: PostsEntity[];

    @OneToMany(()=>CommentsEntity, (comment)=>comment.author_id)
    comments: CommentsEntity[];
}
