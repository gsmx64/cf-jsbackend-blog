import { Entity, Column, OneToMany, ManyToOne } from "typeorm";

import { ICategory } from "../interfaces/category.interface";
import { BaseEntity } from "../../config/base.entity";
import { PostsEntity } from "../../posts/entities/posts.entity";
import { UsersEntity } from "../../users/entities/users.entity";
import { PUBLISH_STATUS } from "../../constants/publishStatus";


@Entity({ name: 'categories' })
export class CategoriesEntity extends BaseEntity implements ICategory {
    @Column({
        type: 'varchar',
        width: 100,
        unique: true
    })
    title: string;

    @Column({
        type: 'varchar',
        width: 255
    })
    description: string;

    @Column({
        type: 'text'
    })
    image: string;

    @Column({
        type: 'enum',
        enum: PUBLISH_STATUS,
        default: PUBLISH_STATUS.UNPUBLISHED
    })
    status: PUBLISH_STATUS;

    @ManyToOne(()=>UsersEntity, (author)=>author.categories)
    author: UsersEntity;

    @OneToMany(()=>PostsEntity, (posts)=>posts.category)
    posts: PostsEntity[];
}
