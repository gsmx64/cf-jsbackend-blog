/**
 * Data transfer object for updating a post.
 */
import { Type } from "class-transformer";
import { IsArray, IsEnum, IsInt, IsOptional, IsString,
    ValidateNested } from "class-validator";
import { ApiProperty } from "@nestjs/swagger";

import { CategoryUpdateDTO } from "../../categories/dto/category.update.dto";
import { UserUpdateDTO } from "../../users/dto/user.update.dto";
import { CommentUpdateDTO } from "../../comments/dto/comment.update.dto";
import { PUBLISH_STATUS } from "../../constants/publish.status";


export class PostUpdateDTO {
    /**
     * The updated title of the post.
     */
    @ApiProperty()
    @IsString()
    @IsOptional()
    title: string;

    /**
     * The updated description of the post.
     */
    @ApiProperty()
    @IsString()
    @IsOptional()
    description: string;

    /**
     * The updated image URL of the post.
     */
    @ApiProperty()
    @IsString({ message: 'Please insert a valid image' })
    @IsOptional()
    image: string;

    /**
     * The updated content of the post.
     */
    @ApiProperty()
    @IsOptional()
    @IsString()
    content: string;

    /**
     * The updated status of the post.
     */
    @ApiProperty()
    @IsEnum(PUBLISH_STATUS)
    @IsOptional()
    status: PUBLISH_STATUS;

    /**
     * The updated author of the post.
     */
    //@ApiProperty()
    @IsString()
    @IsOptional()
    author: UserUpdateDTO;

    /**
     * The updated category of the post.
     */
    @ApiProperty()
    @IsString()
    @IsOptional()
    category: CategoryUpdateDTO;

    /**
     * The updated comments on the post.
     */
    @ApiProperty()
    @ValidateNested()
    @IsArray()
    @Type(() => CommentUpdateDTO)
    @IsOptional()
    comments: CommentUpdateDTO[];
}
