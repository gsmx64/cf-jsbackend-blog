import { Entity, Column, OneToMany } from "typeorm";
import { ICategory } from "../interfaces/category.interface";
import { BaseEntity } from "../../config/base.entity";
import { PostsEntity } from "../../posts/entities/posts.entity";

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

    @OneToMany(()=>PostsEntity, (post)=>post.category_id)
    posts: PostsEntity[];
}
