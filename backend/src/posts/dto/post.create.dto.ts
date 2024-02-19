import { Type } from "class-transformer";
import { IsArray, IsEnum, IsNotEmpty, IsOptional,
    IsString, ValidateNested } from "class-validator";
import { ApiProperty } from "@nestjs/swagger";

import { CategoryCreateDTO } from "../../categories/dto/category.create.dto";
import { UserCreateDTO } from "../../users/dto/user.create.dto";
import { CommentCreateDTO } from "../../comments/dto/comment.create.dto";
import { PUBLISH_STATUS } from "../../constants/publish.status";


/**
 * Represents the data transfer object for creating a post.
 */
export class PostCreateDTO {
    /**
     * The title of the post.
     */
    @ApiProperty()
    @IsNotEmpty({ message: 'Please enter a title' })
    @IsString({ message: 'Please enter a valid title' })
    title: string;

    /**
     * The description of the post.
     */
    @ApiProperty()
    @IsNotEmpty({ message: 'Please enter a description' })
    @IsString({ message: 'Please enter a valid description' })
    description: string;

    /**
     * The image URL of the post.
     */
    @ApiProperty()
    @IsOptional()
    @IsString({ message: 'Please insert a valid image' })
    image: string;

    /**
     * The content of the post.
     */
    @ApiProperty()
    @IsNotEmpty({ message: 'Please write some content' })
    @IsString({ message: 'Please enter a valid content' })
    content: string;

    /**
     * The status of the post.
     */
    @ApiProperty()
    @IsNotEmpty()
    @IsEnum(PUBLISH_STATUS)
    status: PUBLISH_STATUS;

    /**
     * The author of the post.
     */
    //@ApiProperty()
    @IsString()
    @IsNotEmpty()
    author: UserCreateDTO;

    /**
     * The category of the post.
     */
    @ApiProperty()
    @IsNotEmpty()
    @IsString()
    category: CategoryCreateDTO;

    /**
     * The comments on the post.
     */
    @ApiProperty()
    @ValidateNested()
    @IsArray()
    @Type(() => CommentCreateDTO)
    @IsOptional()
    comments: CommentCreateDTO[];
}
