import { Entity, Column, OneToMany, ManyToOne } from "typeorm";

import { ICategory } from "../interfaces/category.interface";
import { BaseEntity } from "../../config/base.entity";
import { PostsEntity } from "../../posts/entities/posts.entity";
import { UsersEntity } from "../../users/entities/users.entity";


@Entity({ name: 'categories' })
export class CategoriesEntity extends BaseEntity implements ICategory {
    @Column()
    title: string;

    @Column()
    description: string;

    @Column()
    image: string;

    @Column()
    status: number;

    @ManyToOne(()=>UsersEntity, (author)=>author.categories)
    author: UsersEntity;

    @OneToMany(()=>PostsEntity, (posts)=>posts.category)
    posts: PostsEntity[];
}
