import { Type } from "class-transformer";
import { IsArray, IsEmail, IsEnum, IsNumber, IsOptional,
    IsString, ValidateNested } from "class-validator";
import { ApiProperty } from "@nestjs/swagger";

import { CommentUpdateDTO } from "../../comments/dto/comment.update.dto";
import { CategoryUpdateDTO } from "../../categories/dto/category.update.dto";
import { PostUpdateDTO } from "../../posts/dto/post.update.dto";
import { ROLES } from "../../constants/roles";
import { USER_STATUS } from "../../constants/user.status";


export class UserUpdateDTO {    
    @ApiProperty()
    @IsString()
    @IsOptional()
    username: string;

    @ApiProperty()
    @IsEmail()
    @IsOptional()
    email: string;

    @ApiProperty()
    @IsString()
    @IsOptional()
    password: string;

    @ApiProperty()
    @IsEnum(USER_STATUS)
    @IsOptional()
    status: USER_STATUS;

    @ApiProperty()
    @IsEnum(ROLES)
    @IsOptional()
    role: ROLES;

    @ApiProperty()
    @IsString()
    @IsOptional()
    karma: number;

    @ApiProperty()
    @IsString()
    @IsOptional()
    avatar: string;

    @ApiProperty()
    @IsString()
    @IsOptional()
    firstName: string;

    @ApiProperty()
    @IsString()
    @IsOptional()
    lastName: string;    

    @ApiProperty()
    @IsNumber()
    @IsOptional()
    age: number;

    @ApiProperty()
    @IsString()
    @IsOptional()
    city: string;

    @ApiProperty()
    @IsString()
    @IsOptional()
    country: string;

    @ApiProperty()
    @ValidateNested()
    @IsArray()
    @Type(() => PostUpdateDTO)
    @IsOptional()
    posts: PostUpdateDTO[];

    @ApiProperty()
    @ValidateNested()
    @IsArray()
    @Type(() => CategoryUpdateDTO)
    @IsOptional()
    categories: CategoryUpdateDTO[];

    @ApiProperty()
    @ValidateNested()
    @IsArray()
    @Type(() => CommentUpdateDTO)
    @IsOptional()
    comments: CommentUpdateDTO[];
}
