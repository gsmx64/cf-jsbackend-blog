import { Type } from "class-transformer";
import { IsArray, IsInt, IsNotEmpty, IsOptional, IsString, ValidateNested } from "class-validator";

import { CategoryDTO } from "../../categories/dto/category.dto";
import { UserDTO } from "../../users/dto/user.dto";
import { CommentDTO } from "../../comments/dto/comment.dto";


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

    @IsString()
    @IsNotEmpty()
    author: UserDTO;

    @IsNotEmpty()
    @IsString()
    category: CategoryDTO;

    @ValidateNested()
    @IsArray()
    @Type(() => CommentDTO)
    @IsOptional()
    comments: CommentDTO[];
}
