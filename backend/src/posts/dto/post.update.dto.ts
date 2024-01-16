import { Type } from "class-transformer";
import { IsArray, IsInt, IsOptional, IsString, ValidateNested } from "class-validator";
import { CategoriesEntity } from "../../categories/entities/categories.entity";
import { CommentDTO } from "../../comments/dto/comment.dto";
import { UsersEntity } from "../../users/entities/users.entity";

export class PostUpdateDTO {
    @IsString()
    @IsOptional()
    title: string;

    @IsString()
    @IsOptional()
    description: string;

    @IsString({ message: 'Please insert a valid image' })
    @IsOptional()
    image: string;

    @IsOptional()
    @IsString()
    content: string;

    @IsInt()
    @IsOptional()
    status: number;

    @IsString()
    @IsOptional()
    user_id: UsersEntity;

    @IsString()
    @IsOptional()
    category_id: CategoriesEntity;

    @ValidateNested()
    @IsArray()
    @Type(() => CommentDTO)
    @IsOptional()
    comments: CommentDTO[];
}
