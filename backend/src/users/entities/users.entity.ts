import { Entity, Column, OneToMany } from "typeorm";
import { ROLES } from "../../constants/roles";
import { IUser } from "../../interfaces/user.interface";
import { BaseEntity } from "../../config/base.entity";
import { UsersPostsEntity } from "./usersPosts.entity";
import { UsersCommentsEntity } from "./usersComments.entity";

@Entity({ name: 'users' })
export class UsersEntity extends BaseEntity implements IUser {
    @Column({
        unique: true
    })
    username: string;

    @Column()
    password: string;

    @Column()
    status: number;
    
    @Column({
        type: 'enum',
        enum: ROLES,
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
    
    @Column({
        unique: true
    })
    email: string;

    @Column()
    age: number;

    @Column()
    city: string;

    @Column()
    country: string;

    @OneToMany(()=>UsersPostsEntity, (usersPosts)=>usersPosts.user)
    postsIncludes: UsersPostsEntity[]

    @OneToMany(()=>UsersCommentsEntity, (usersComments)=>usersComments.user)
    commentsIncludes: UsersCommentsEntity[]
}
