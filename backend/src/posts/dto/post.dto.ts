import { Type } from "class-transformer";
import { IsArray, IsInt, IsNotEmpty, IsOptional, IsString, ValidateNested } from "class-validator";
import { CategoriesEntity } from "../../categories/entities/categories.entity";
import { CommentDTO } from "../../comments/dto/comment.dto";
import { UsersEntity } from "../../users/entities/users.entity";

export class PostDTO {
    @IsNotEmpty({ message: 'Please enter a title' })
    @IsString({ message: 'Please enter a valid title' })
    title: string;

    @IsNotEmpty({ message: 'Please enter a description' })
    @IsString({ message: 'Please enter a valid description' })
    description: string;

    @IsOptional()
    @IsString({ message: 'Please insert a valid image' })
    image: string;

    @IsNotEmpty({ message: 'Please write some content' })
    @IsString({ message: 'Please enter a valid content' })
    content: string;

    @IsNotEmpty()
    @IsInt()
    status: number;

    @IsNotEmpty()
    @IsString()
    user_id: UsersEntity;

    @IsNotEmpty()
    @IsString()
    category_id: CategoriesEntity;

    @ValidateNested()
    @IsArray()
    @Type(() => CommentDTO)
    @IsOptional()
    comments: CommentDTO[];
}
