import { Entity, Column, OneToMany } from "typeorm";
import { ICategory } from "../../interfaces/category.interface";
import { BaseEntity } from "../../config/base.entity";
import { CategoriesPostsEntity } from "./categoriesPosts.entity";

@Entity({ name: 'comments' })
export class CategoriesEntity extends BaseEntity implements ICategory {
    @Column()
    title: string;

    @Column()
    description: string;

    @Column()
    status: number;

    @OneToMany(()=>CategoriesPostsEntity, (categoriesPosts)=>categoriesPosts.category)
    postsIncludes: CategoriesPostsEntity[]
}
