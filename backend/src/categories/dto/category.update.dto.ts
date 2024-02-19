import { Type } from "class-transformer";
import { IsArray, IsEnum, IsNumber, IsOptional,
    IsString, ValidateNested } from "class-validator";
import { ApiProperty } from "@nestjs/swagger";

import { PostUpdateDTO } from "../../posts/dto/post.update.dto";
import { UserUpdateDTO } from "../../users/dto/user.update.dto";
import { PUBLISH_STATUS } from "../../constants/publish.status";


/**
 * Represents the data transfer object for updating a category.
 */
export class CategoryUpdateDTO {
    /**
     * The updated title of the category.
     */
    @ApiProperty()
    @IsString({ message: 'Please insert a valid title' })
    @IsOptional()
    title: string;

    /**
     * The updated description of the category.
     */
    @ApiProperty()
    @IsString({ message: 'Please insert a valid description' })
    @IsOptional()
    description: string;

    /**
     * The updated image URL of the category.
     */
    @ApiProperty()
    @IsString({ message: 'Please insert a valid image' })
    @IsOptional()
    image: string;

    /**
     * The updated status of the category.
     */
    @ApiProperty()
    @IsEnum(PUBLISH_STATUS)
    @IsOptional()
    status: PUBLISH_STATUS;

    /**
     * The updated author of the category.
     */
    //@ApiProperty()
    @IsString()
    @IsOptional()
    author: UserUpdateDTO;

    /**
     * The updated posts associated with the category.
     */
    @ApiProperty()
    @ValidateNested()
    @IsArray()
    @Type(() => PostUpdateDTO)
    @IsOptional()
    posts: PostUpdateDTO[];
}
