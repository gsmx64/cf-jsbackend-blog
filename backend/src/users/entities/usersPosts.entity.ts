import { Entity, Column, ManyToOne } from "typeorm";
import { ACCESS_LEVEL } from "../../constants/roles";
import { BaseEntity } from "../../config/base.entity";
import { UsersEntity } from "./users.entity";
import { PostsEntity } from "../../posts/entities/posts.entity";

@Entity({ name: 'users_posts' })
export class UsersPostsEntity extends BaseEntity {
    @Column({
        type: 'enum',
        enum: ACCESS_LEVEL,
    })
    accessLevel: ACCESS_LEVEL;

    @ManyToOne(()=>UsersEntity, (user)=>user.postsIncludes)
    user: UsersEntity;

    @ManyToOne(()=>PostsEntity, (post)=>post.usersIncludes)
    post: PostsEntity
}