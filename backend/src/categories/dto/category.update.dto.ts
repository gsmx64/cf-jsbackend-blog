import { Type } from "class-transformer";
import { IsArray, IsNumber, IsOptional, IsString, ValidateNested } from "class-validator";
import { PostDTO } from "../../posts/dto/post.dto";

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

    @IsNumber()
    @IsOptional()
    status: number;

    @ValidateNested()
    @IsArray()
    @Type(() => PostDTO)
    @IsOptional()
    posts: PostDTO[];
}
