import { Type } from "class-transformer";
import { IsArray, IsEmail, IsEnum, IsNumber, IsOptional,
    IsString, ValidateNested } from "class-validator";
import { ApiProperty } from "@nestjs/swagger";

import { CommentUpdateDTO } from "../../comments/dto/comment.update.dto";
import { CategoryUpdateDTO } from "../../categories/dto/category.update.dto";
import { PostUpdateDTO } from "../../posts/dto/post.update.dto";
import { ROLES } from "../../constants/roles";
import { USER_STATUS } from "../../constants/user.status";


/**
 * Represents the data transfer object for updating a user.
 */
export class UserUpdateDTO {    
    /**
     * The updated username of the user.
     */
    @ApiProperty()
    @IsString()
    @IsOptional()
    username: string;

    /**
     * The updated email of the user.
     */
    @ApiProperty()
    @IsEmail()
    @IsOptional()
    email: string;

    /**
     * The updated password of the user.
     */
    @ApiProperty()
    @IsString()
    @IsOptional()
    password: string;

    /**
     * The updated status of the user.
     */
    @ApiProperty()
    @IsEnum(USER_STATUS)
    @IsOptional()
    status: USER_STATUS;

    /**
     * The updated role of the user.
     */
    @ApiProperty()
    @IsEnum(ROLES)
    @IsOptional()
    role: ROLES;

    /**
     * The updated karma of the user.
     */
    @ApiProperty()
    @IsString()
    @IsOptional()
    karma: number;

    /**
     * The updated avatar of the user.
     */
    @ApiProperty()
    @IsString()
    @IsOptional()
    avatar: string;

    /**
     * The updated first name of the user.
     */
    @ApiProperty()
    @IsString()
    @IsOptional()
    firstName: string;

    /**
     * The updated last name of the user.
     */
    @ApiProperty()
    @IsString()
    @IsOptional()
    lastName: string;    

    /**
     * The updated age of the user.
     */
    @ApiProperty()
    @IsNumber()
    @IsOptional()
    age: number;

    /**
     * The updated city of the user.
     */
    @ApiProperty()
    @IsString()
    @IsOptional()
    city: string;

    /**
     * The updated country of the user.
     */
    @ApiProperty()
    @IsString()
    @IsOptional()
    country: string;

    /**
     * The updated posts created by the user.
     */
    @ApiProperty()
    @ValidateNested()
    @IsArray()
    @Type(() => PostUpdateDTO)
    @IsOptional()
    posts: PostUpdateDTO[];

    /**
     * The updated categories associated with the user.
     */
    @ApiProperty()
    @ValidateNested()
    @IsArray()
    @Type(() => CategoryUpdateDTO)
    @IsOptional()
    categories: CategoryUpdateDTO[];

    /**
     * The updated comments made by the user.
     */
    @ApiProperty()
    @ValidateNested()
    @IsArray()
    @Type(() => CommentUpdateDTO)
    @IsOptional()
    comments: CommentUpdateDTO[];
}
