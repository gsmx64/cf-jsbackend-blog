import { Entity, Column, OneToMany, ManyToOne } from "typeorm";
import { Exclude } from "class-transformer";

import { ROLES } from "../../constants/roles";
import { IUser } from "../interfaces/user.interface";
import { BaseEntity } from "../../config/base.entity";
import { CommentsEntity } from "../../comments/entities/comments.entity";
import { PostsEntity } from "../../posts/entities/posts.entity";
import { CategoriesEntity } from "../../categories/entities/categories.entity";


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

    @OneToMany(()=>PostsEntity, (posts)=>posts.author)
    posts: PostsEntity[];

    @OneToMany(()=>CategoriesEntity, (categories)=>categories.author)
    categories: CategoriesEntity[];

    @OneToMany(()=>CommentsEntity, (comments)=>comments.author)
    comments: CommentsEntity[];
}
