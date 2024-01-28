import { Type } from "class-transformer";
import { IsArray, IsNotEmpty, IsNumber, IsOptional,
    IsString, ValidateNested } from "class-validator";

import { PostDTO } from "../../posts/dto/post.dto";
import { UserDTO } from "../../users/dto/user.dto";


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
    @IsNumber()
    status: number;

    @IsNotEmpty()
    @IsString()
    author: UserDTO;

    @ValidateNested()
    @IsArray()
    @Type(() => PostDTO)
    @IsOptional()
    posts: PostDTO[];
}
