import { Type } from "class-transformer";
import { IsArray, IsEnum, IsInt, IsOptional, IsString,
    ValidateNested } from "class-validator";
import { ApiProperty } from "@nestjs/swagger";

import { CategoryUpdateDTO } from "../../categories/dto/category.update.dto";
import { UserUpdateDTO } from "../../users/dto/user.update.dto";
import { CommentUpdateDTO } from "../../comments/dto/comment.update.dto";
import { PUBLISH_STATUS } from "src/constants/publish.status";


export class PostUpdateDTO {
    @ApiProperty()
    @IsString()
    @IsOptional()
    title: string;

    @ApiProperty()
    @IsString()
    @IsOptional()
    description: string;

    @ApiProperty()
    @IsString({ message: 'Please insert a valid image' })
    @IsOptional()
    image: string;

    @ApiProperty()
    @IsOptional()
    @IsString()
    content: string;

    @ApiProperty()
    @IsEnum(PUBLISH_STATUS)
    @IsOptional()
    status: PUBLISH_STATUS;

    //@ApiProperty()
    @IsString()
    @IsOptional()
    author: UserUpdateDTO;

    @ApiProperty()
    @IsString()
    @IsOptional()
    category: CategoryUpdateDTO;

    @ApiProperty()
    @ValidateNested()
    @IsArray()
    @Type(() => CommentUpdateDTO)
    @IsOptional()
    comments: CommentUpdateDTO[];
}
