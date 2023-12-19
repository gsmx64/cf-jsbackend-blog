import { Entity, Column, ManyToOne } from "typeorm";
import { BaseEntity } from "../../config/base.entity";
import { CategoriesEntity } from "./categories.entity";
import { PostsEntity } from "../../posts/entities/posts.entity";

@Entity({ name: 'categories_posts' })
export class CategoriesPostsEntity extends BaseEntity {
    @Column()
    catid: number;

    @ManyToOne(()=>CategoriesEntity, (category)=>category.postsIncludes)
    category: CategoriesEntity;

    @ManyToOne(()=>PostsEntity, (post)=>post.categoriesIncludes)
    post: PostsEntity
}