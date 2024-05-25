import { Type } from "class-transformer";
import { IsArray, IsEnum, IsNotEmpty, IsOptional,
    IsString, ValidateNested } from "class-validator";
import { ApiProperty } from "@nestjs/swagger";

import { PostCreateDTO } from "../../posts/dto/post.create.dto";
import { UserCreateDTO } from "../../users/dto/user.create.dto";
import { PUBLISH_STATUS } from "../../constants/publish.status";


/**
 * Data transfer object for creating a category.
 */
export class CategoryCreateDTO {
    /**
     * The title of the category.
     */
    @ApiProperty()
    @IsNotEmpty()
    @IsString({ message: 'Please insert a valid title' })
    title: string;

    /**
     * The description of the category.
     */
    @ApiProperty()
    @IsNotEmpty()
    @IsString({ message: 'Please insert a valid description' })
    description: string;

    /**
     * The image URL of the category.
     */
    @ApiProperty()
    @IsOptional()
    @IsString({ message: 'Please insert a valid image' })
    image: string;

    /**
     * The status of the category.
     */
    @ApiProperty()
    @IsOptional()
    @IsEnum(PUBLISH_STATUS)
    status: PUBLISH_STATUS;

    /**
     * The author of the category.
     */
    //@ApiProperty()
    @IsOptional()
    @IsString()
    author: UserCreateDTO;

    /**
     * The posts associated with the category.
     */
    @ApiProperty()
    @ValidateNested()
    @IsArray()
    @Type(() => PostCreateDTO)
    @IsOptional()
    posts: PostCreateDTO[];
}
