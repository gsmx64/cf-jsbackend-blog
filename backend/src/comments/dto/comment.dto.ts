import { IsNotEmpty, IsOptional, IsString } from "class-validator";

import { UserDTO } from "../../users/dto/user.dto";
import { PostDTO } from "../../posts/dto/post.dto";


export class CommentDTO {
    @IsNotEmpty({ message: 'Please enter a comment' })
    @IsString({ message: 'Please enter a valid comment' })
    message: string;

    @IsNotEmpty()
    @IsString()
    reaction: string;

    @IsNotEmpty()
    @IsString()
    author: UserDTO;

    @IsString()
    @IsOptional()
    post: PostDTO;
}
