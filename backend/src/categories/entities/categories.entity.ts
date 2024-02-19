import { Entity, Column, OneToMany, ManyToOne } from "typeorm";

import { ICategory } from "../interfaces/category.interface";
import { BaseEntity } from "../../config/base.entity";
import { PostsEntity } from "../../posts/entities/posts.entity";
import { UsersEntity } from "../../users/entities/users.entity";
import { PUBLISH_STATUS } from "../../constants/publish.status";


/**
 * Represents the CategoriesEntity class, which is an entity in the database for storing category information.
 */
@Entity({ name: 'categories' })
export class CategoriesEntity extends BaseEntity implements ICategory {
    /**
     * The title of the category.
     */
    @Column({
        type: 'varchar',
        width: 100,
        unique: true
    })
    title: string;

    /**
     * The description of the category.
     */
    @Column({
        type: 'varchar',
        width: 255
    })
    description: string;

    /**
     * The image URL of the category.
     */
    @Column({
        type: 'text'
    })
    image: string;

    /**
     * The publish status of the category.
     */
    @Column({
        type: 'enum',
        enum: PUBLISH_STATUS,
        default: PUBLISH_STATUS.UNPUBLISHED
    })
    status: PUBLISH_STATUS;

    /**
     * The author of the category.
     */
    @ManyToOne(()=>UsersEntity, (author)=>author.categories)
    author: UsersEntity;

    /**
     * The posts associated with the category.
     */
    @OneToMany(()=>PostsEntity, (posts)=>posts.category)
    posts: PostsEntity[];
}
