import { Entity, Column, OneToMany } from "typeorm";
import { IPost } from "../../interfaces/post.interface";
import { BaseEntity } from "../../config/base.entity";
import { UsersPostsEntity } from "../../users/entities/usersPosts.entity";
import { CategoriesPostsEntity } from "../../categories/entities/categoriesPosts.entity";

@Entity({ name: 'posts' })
export class PostsEntity extends BaseEntity implements IPost {
    @Column({
        unique: true
    })
    title: string;

    @Column()
    description: string;

    @Column()
    content: string;

    @Column()
    status: number;

    @Column()
    catid: number;

    @OneToMany(()=>UsersPostsEntity, (usersPosts)=>usersPosts.post)
    usersIncludes: UsersPostsEntity[]

    @OneToMany(()=>CategoriesPostsEntity, (categoriesPosts)=>categoriesPosts.post)
    categoriesIncludes: CategoriesPostsEntity[]
}
