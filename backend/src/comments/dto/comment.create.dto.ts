import { IsNotEmpty, IsOptional, IsString } from "class-validator";
import { ApiProperty } from "@nestjs/swagger";

import { UserCreateDTO } from "../../users/dto/user.create.dto";
import { PostCreateDTO } from "../../posts/dto/post.create.dto";


/**
 * Data transfer object for creating a comment.
 */
export class CommentCreateDTO {
    /**
     * The comment message.
     */
    @ApiProperty()
    @IsNotEmpty({ message: 'Please enter a comment' })
    @IsString({ message: 'Please enter a valid comment' })
    message: string;

    /**
     * The reaction to the comment.
     */
    @ApiProperty()
    @IsNotEmpty()
    @IsString()
    reaction: string;

    /**
     * The author of the comment.
     */
    //@ApiProperty()
    @IsNotEmpty()
    @IsString()
    author: UserCreateDTO;

    /**
     * The post associated with the comment.
     */
    @ApiProperty()
    @IsString()
    @IsOptional()
    post: PostCreateDTO;
}
