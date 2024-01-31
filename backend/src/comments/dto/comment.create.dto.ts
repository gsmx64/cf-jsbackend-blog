import { IsNotEmpty, IsOptional, IsString } from "class-validator";
import { ApiProperty } from "@nestjs/swagger";

import { UserCreateDTO } from "../../users/dto/user.create.dto";
import { PostCreateDTO } from "../../posts/dto/post.create.dto";


export class CommentCreateDTO {
    @ApiProperty()
    @IsNotEmpty({ message: 'Please enter a comment' })
    @IsString({ message: 'Please enter a valid comment' })
    message: string;

    @ApiProperty()
    @IsNotEmpty()
    @IsString()
    reaction: string;

    //@ApiProperty()
    @IsNotEmpty()
    @IsString()
    author: UserCreateDTO;

    @ApiProperty()
    @IsString()
    @IsOptional()
    post: PostCreateDTO;
}
