import { IsOptional, IsString } from "class-validator";
import { ApiProperty } from "@nestjs/swagger";

import { UserUpdateDTO } from "../../users/dto/user.update.dto";
import { PostUpdateDTO } from "../../posts/dto/post.update.dto";


/**
 * Data transfer object for updating a comment.
 */
export class CommentUpdateDTO {
    /**
     * The updated message of the comment.
     */
    @ApiProperty()
    @IsString()
    @IsOptional()
    message: string;

    /**
     * The updated author of the comment.
     */
    //@ApiProperty()
    @IsString()
    @IsOptional()
    author: UserUpdateDTO;

    /**
     * The updated post of the comment.
     */
    @ApiProperty()
    @IsString()
    @IsOptional()
    post: PostUpdateDTO;
}
