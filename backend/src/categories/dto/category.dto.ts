import { IsNotEmpty, IsNumber, IsOptional, IsString, IsUUID } from "class-validator";
import { CategoriesEntity } from "../entities/categories.entity";
import { PostsEntity } from "src/posts/entities/posts.entity";

export class CategoryDTO {
    @IsNotEmpty()
    @IsString()
    title: string;

    @IsNotEmpty()
    @IsString()
    description: string;

    @IsOptional()
    @IsString({ message: 'Please insert a valid image' })
    image: string;

    @IsNotEmpty()
    @IsNumber()
    status: number;
}

export class CategoryUpdateDTO {
    @IsOptional()
    @IsString()
    title: string;

    @IsOptional()
    @IsString()
    description: string;

    @IsOptional()
    @IsString({ message: 'Please insert a valid image' })
    image: string;

    @IsOptional()
    @IsNumber()
    status: number;
}

export class CategoryToPostDTO {
    @IsNotEmpty()
    @IsUUID()
    category: CategoriesEntity;

    @IsNotEmpty()
    @IsUUID()
    post: PostsEntity;
}
