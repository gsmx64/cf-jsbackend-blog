import { Type } from "class-transformer";
import { IsArray, IsEmail, IsEnum, IsNumber, IsOptional,
    IsString, ValidateNested } from "class-validator";

import { CommentDTO } from "../../comments/dto/comment.dto";
import { CategoryDTO } from "../../categories/dto/category.dto";
import { PostDTO } from "../../posts/dto/post.dto";
import { ROLES } from "../../constants/roles";
import { USER_STATUS } from "../../constants/userStatus";


export class UserUpdateDTO {    
    @IsString()
    @IsOptional()
    username: string;

    @IsEmail()
    @IsOptional()
    email: string;

    @IsString()
    @IsOptional()
    password: string;

    @IsEnum(USER_STATUS)
    @IsOptional()
    status: USER_STATUS;

    @IsEnum(ROLES)
    @IsOptional()
    role: ROLES;

    @IsString()
    @IsOptional()
    karma: number;

    @IsString()
    @IsOptional()
    avatar: string;

    @IsString()
    @IsOptional()
    firstName: string;

    @IsString()
    @IsOptional()
    lastName: string;    

    @IsNumber()
    @IsOptional()
    age: number;

    @IsString()
    @IsOptional()
    city: string;

    @IsString()
    @IsOptional()
    country: string;

    @ValidateNested()
    @IsArray()
    @Type(() => PostDTO)
    @IsOptional()
    posts: PostDTO[];

    @ValidateNested()
    @IsArray()
    @Type(() => CategoryDTO)
    @IsOptional()
    categories: CategoryDTO[];

    @ValidateNested()
    @IsArray()
    @Type(() => CommentDTO)
    @IsOptional()
    comments: CommentDTO[];
}
