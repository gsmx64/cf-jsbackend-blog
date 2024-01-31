import { IsOptional, IsString } from "class-validator";
import { ApiProperty } from "@nestjs/swagger";

import { UserUpdateDTO } from "../../users/dto/user.update.dto";
import { PostUpdateDTO } from "../../posts/dto/post.update.dto";


export class CommentUpdateDTO {
    @ApiProperty()
    @IsString()
    @IsOptional()
    message: string;

    @ApiProperty()
    @IsString()
    @IsOptional()
    reaction: string;

    //@ApiProperty()
    @IsString()
    @IsOptional()
    author: UserUpdateDTO;

    @ApiProperty()
    @IsString()
    @IsOptional()
    post: PostUpdateDTO;
}
