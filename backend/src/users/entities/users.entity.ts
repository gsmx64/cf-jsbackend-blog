import { Entity, Column, OneToMany, ManyToOne } from "typeorm";
import { Exclude } from "class-transformer";

import { ROLES } from "../../constants/roles";
import { IUser } from "../interfaces/user.interface";
import { BaseEntity } from "../../config/base.entity";
import { CommentsEntity } from "../../comments/entities/comments.entity";
import { PostsEntity } from "../../posts/entities/posts.entity";
import { CategoriesEntity } from "../../categories/entities/categories.entity";
import { USER_STATUS } from "../../constants/user.status";


/**
 * Represents the UsersEntity class, which is an entity in the database for storing user information.
 */
@Entity({ name: 'users' })
export class UsersEntity extends BaseEntity implements IUser {
    /**
     * The username of the user.
     */
    @Column({
        type: 'varchar',
        width: 20,
        unique: true
    })
    username: string;

    /**
     * The email address of the user.
     */
    @Column({
        type: 'varchar',
        width: 254,
        unique: true
    })
    email: string;

    /**
     * The password of the user.
     */
    @Exclude()
    @Column({
        type: 'varchar',
        width: 40
    })
    password: string;

    /**
     * The status of the user.
     */
    @Column({
        type: 'enum',
        enum: USER_STATUS,
        default: USER_STATUS.PENDING
    })
    status: USER_STATUS;
    
    /**
     * The role of the user.
     */
    @Column({
        type: 'enum',
        enum: ROLES,
        default: ROLES.BASIC
    })
    role: ROLES;

    /**
     * The karma points of the user.
     */
    @Column({
        type: 'int',
        width: 5
    })
    karma: number;

    /**
     * The avatar URL of the user.
     */
    @Column({
        type: 'text'
    })
    avatar: string;

    /**
     * The first name of the user.
     */
    @Column({
        type: 'varchar',
        width: 40
    })
    firstName: string;

    /**
     * The last name of the user.
     */
    @Column({
        type: 'varchar',
        width: 40
    })
    lastName: string;

    /**
     * The age of the user.
     */
    @Column({
        type: 'int',
        width: 2
    })
    age: number;

    /**
     * The city of the user.
     */
    @Column({
        type: 'varchar',
        width: 40
    })
    city: string;

    /**
     * The country of the user.
     */
    @Column({
        type: 'varchar',
        width: 40
    })
    country: string;

    /**
     * The posts created by the user.
     */
    @OneToMany(()=>PostsEntity, (posts)=>posts.author)
    posts: PostsEntity[];

    /**
     * The categories created by the user.
     */
    @OneToMany(()=>CategoriesEntity, (categories)=>categories.author)
    categories: CategoriesEntity[];

    /**
     * The comments made by the user.
     */
    @OneToMany(()=>CommentsEntity, (comments)=>comments.author)
    comments: CommentsEntity[];
}
