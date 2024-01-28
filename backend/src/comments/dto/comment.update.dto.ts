import { IsOptional, IsString } from "class-validator";

import { UserDTO } from "../../users/dto/user.dto";
import { PostDTO } from "../../posts/dto/post.dto";


export class CommentUpdateDTO {
    @IsString()
    @IsOptional()
    message: string;

    @IsString()
    @IsOptional()
    reaction: string;

    @IsString()
    @IsOptional()
    author: UserDTO;

    @IsString()
    @IsOptional()
    post: PostDTO;
}
