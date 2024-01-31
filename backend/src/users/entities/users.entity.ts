import { Entity, Column, OneToMany, ManyToOne } from "typeorm";
import { Exclude } from "class-transformer";

import { ROLES } from "../../constants/roles";
import { IUser } from "../interfaces/user.interface";
import { BaseEntity } from "../../config/base.entity";
import { CommentsEntity } from "../../comments/entities/comments.entity";
import { PostsEntity } from "../../posts/entities/posts.entity";
import { CategoriesEntity } from "../../categories/entities/categories.entity";
import { USER_STATUS } from "../../constants/user.status";


@Entity({ name: 'users' })
export class UsersEntity extends BaseEntity implements IUser {
    @Column({
        type: 'varchar',
        width: 20,
        unique: true
    })
    username: string;

    @Column({
        type: 'varchar',
        width: 255,
        unique: true
    })
    email: string;

    @Exclude()
    @Column({
        type: 'varchar',
        width: 40
    })
    password: string;

    @Column({
        type: 'enum',
        enum: USER_STATUS,
        default: USER_STATUS.PENDING
    })
    status: USER_STATUS;
    
    @Column({
        type: 'enum',
        enum: ROLES,
        default: ROLES.BASIC
    })
    role: ROLES;

    @Column({
        type: 'int',
        width: 5
    })
    karma: number;

    @Column({
        type: 'text'
    })
    avatar: string;

    @Column({
        type: 'varchar',
        width: 40
    })
    firstName: string;

    @Column({
        type: 'varchar',
        width: 40
    })
    lastName: string;

    @Column({
        type: 'int',
        width: 2
    })
    age: number;

    @Column({
        type: 'varchar',
        width: 40
    })
    city: string;

    @Column({
        type: 'varchar',
        width: 40
    })
    country: string;

    @OneToMany(()=>PostsEntity, (posts)=>posts.author)
    posts: PostsEntity[];

    @OneToMany(()=>CategoriesEntity, (categories)=>categories.author)
    categories: CategoriesEntity[];

    @OneToMany(()=>CommentsEntity, (comments)=>comments.author)
    comments: CommentsEntity[];
}
