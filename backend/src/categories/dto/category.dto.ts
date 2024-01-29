import { Type } from "class-transformer";
import { IsArray, IsEnum, IsNotEmpty, IsNumber, IsOptional,
    IsString, ValidateNested } from "class-validator";

import { PostDTO } from "../../posts/dto/post.dto";
import { UserDTO } from "../../users/dto/user.dto";
import { PUBLISH_STATUS } from "../../constants/publishStatus";


export class CategoryDTO {
    @IsNotEmpty()
    @IsString({ message: 'Please insert a valid title' })
    title: string;

    @IsNotEmpty()
    @IsString({ message: 'Please insert a valid description' })
    description: string;

    @IsOptional()
    @IsString({ message: 'Please insert a valid image' })
    image: string;

    @IsNotEmpty()
    @IsEnum(PUBLISH_STATUS)
    status: PUBLISH_STATUS;

    @IsNotEmpty()
    @IsString()
    author: UserDTO;

    @ValidateNested()
    @IsArray()
    @Type(() => PostDTO)
    @IsOptional()
    posts: PostDTO[];
}
