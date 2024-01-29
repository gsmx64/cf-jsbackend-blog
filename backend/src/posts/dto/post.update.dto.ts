import { Type } from "class-transformer";
import { IsArray, IsEnum, IsInt, IsOptional, IsString,
    ValidateNested } from "class-validator";

import { CategoryDTO } from "../../categories/dto/category.dto";
import { UserDTO } from "../../users/dto/user.dto";
import { CommentDTO } from "../../comments/dto/comment.dto";
import { PUBLISH_STATUS } from "src/constants/publishStatus";


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

    @IsEnum(PUBLISH_STATUS)
    @IsOptional()
    status: PUBLISH_STATUS;

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
