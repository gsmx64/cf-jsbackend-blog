import { Type } from "class-transformer";
import { IsArray, IsEnum, IsNotEmpty, IsOptional,
    IsString, ValidateNested } from "class-validator";
import { ApiProperty } from "@nestjs/swagger";

import { PostCreateDTO } from "../../posts/dto/post.create.dto";
import { UserCreateDTO } from "../../users/dto/user.create.dto";
import { PUBLISH_STATUS } from "../../constants/publish.status";


export class CategoryCreateDTO {
    @ApiProperty()
    @IsNotEmpty()
    @IsString({ message: 'Please insert a valid title' })
    title: string;

    @ApiProperty()
    @IsNotEmpty()
    @IsString({ message: 'Please insert a valid description' })
    description: string;

    @ApiProperty()
    @IsOptional()
    @IsString({ message: 'Please insert a valid image' })
    image: string;

    @ApiProperty()
    @IsNotEmpty()
    @IsEnum(PUBLISH_STATUS)
    status: PUBLISH_STATUS;

    //@ApiProperty()
    @IsNotEmpty()
    @IsString()
    author: UserCreateDTO;

    @ApiProperty()
    @ValidateNested()
    @IsArray()
    @Type(() => PostCreateDTO)
    @IsOptional()
    posts: PostCreateDTO[];
}
