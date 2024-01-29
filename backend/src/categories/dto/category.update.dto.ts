import { Type } from "class-transformer";
import { IsArray, IsEnum, IsNumber, IsOptional,
    IsString, ValidateNested } from "class-validator";

import { PostDTO } from "../../posts/dto/post.dto";
import { UserDTO } from "../../users/dto/user.dto";
import { PUBLISH_STATUS } from "../../constants/publishStatus";


export class CategoryUpdateDTO {
    @IsString({ message: 'Please insert a valid title' })
    @IsOptional()
    title: string;

    @IsString({ message: 'Please insert a valid description' })
    @IsOptional()
    description: string;

    @IsString({ message: 'Please insert a valid image' })
    @IsOptional()
    image: string;

    @IsEnum(PUBLISH_STATUS)
    @IsOptional()
    status: PUBLISH_STATUS;

    @IsString()
    @IsOptional()
    author: UserDTO;

    @ValidateNested()
    @IsArray()
    @Type(() => PostDTO)
    @IsOptional()
    posts: PostDTO[];
}
