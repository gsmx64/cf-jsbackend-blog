import { Type } from "class-transformer";
import { IsArray, IsEnum, IsNotEmpty, IsOptional,
    IsString, ValidateNested } from "class-validator";
import { ApiProperty } from "@nestjs/swagger";

import { CategoryCreateDTO } from "../../categories/dto/category.create.dto";
import { UserCreateDTO } from "../../users/dto/user.create.dto";
import { CommentCreateDTO } from "../../comments/dto/comment.create.dto";
import { PUBLISH_STATUS } from "../../constants/publish.status";


export class PostCreateDTO {
    @ApiProperty()
    @IsNotEmpty({ message: 'Please enter a title' })
    @IsString({ message: 'Please enter a valid title' })
    title: string;

    @ApiProperty()
    @IsNotEmpty({ message: 'Please enter a description' })
    @IsString({ message: 'Please enter a valid description' })
    description: string;

    @ApiProperty()
    @IsOptional()
    @IsString({ message: 'Please insert a valid image' })
    image: string;

    @ApiProperty()
    @IsNotEmpty({ message: 'Please write some content' })
    @IsString({ message: 'Please enter a valid content' })
    content: string;

    @ApiProperty()
    @IsNotEmpty()
    @IsEnum(PUBLISH_STATUS)
    status: PUBLISH_STATUS;

    //@ApiProperty()
    @IsString()
    @IsNotEmpty()
    author: UserCreateDTO;

    @ApiProperty()
    @IsNotEmpty()
    @IsString()
    category: CategoryCreateDTO;

    @ApiProperty()
    @ValidateNested()
    @IsArray()
    @Type(() => CommentCreateDTO)
    @IsOptional()
    comments: CommentCreateDTO[];
}
