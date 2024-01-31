import { Type } from "class-transformer";
import { IsArray, IsEnum, IsNumber, IsOptional,
    IsString, ValidateNested } from "class-validator";
import { ApiProperty } from "@nestjs/swagger";

import { PostUpdateDTO } from "../../posts/dto/post.update.dto";
import { UserUpdateDTO } from "../../users/dto/user.update.dto";
import { PUBLISH_STATUS } from "../../constants/publish.status";


export class CategoryUpdateDTO {
    @ApiProperty()
    @IsString({ message: 'Please insert a valid title' })
    @IsOptional()
    title: string;

    @ApiProperty()
    @IsString({ message: 'Please insert a valid description' })
    @IsOptional()
    description: string;

    @ApiProperty()
    @IsString({ message: 'Please insert a valid image' })
    @IsOptional()
    image: string;

    @ApiProperty()
    @IsEnum(PUBLISH_STATUS)
    @IsOptional()
    status: PUBLISH_STATUS;

    //@ApiProperty()
    @IsString()
    @IsOptional()
    author: UserUpdateDTO;

    @ApiProperty()
    @ValidateNested()
    @IsArray()
    @Type(() => PostUpdateDTO)
    @IsOptional()
    posts: PostUpdateDTO[];
}
