import { IsNotEmpty, IsString } from "class-validator";
import { CommentsEntity } from "../entities/comments.entity";
import { PostsEntity } from "../../posts/entities/posts.entity";

export class CommentDTO {
    @IsNotEmpty({ message: 'Please enter a comment' })
    @IsString({ message: 'Please enter a valid comment' })
    comment: string;

    @IsNotEmpty()
    @IsString()
    reaction: string;

    @IsNotEmpty()
    @IsString()
    author_id: CommentsEntity;

    @IsNotEmpty()
    @IsString()
    post_id: PostsEntity;
}
