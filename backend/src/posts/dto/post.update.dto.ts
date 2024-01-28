import { Type } from "class-transformer";
import { IsArray, IsInt, IsOptional, IsString,
    ValidateNested } from "class-validator";

import { CategoryDTO } from "../../categories/dto/category.dto";
import { UserDTO } from "../../users/dto/user.dto";
import { CommentDTO } from "../../comments/dto/comment.dto";


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
    author: UserDTO;

    @IsString()
    @IsOptional()
    category: CategoryDTO;

    @ValidateNested()
    @IsArray()
    @Type(() => CommentDTO)
    @IsOptional()
    comments: CommentDTO[];
}
