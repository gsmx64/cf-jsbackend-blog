import { IsOptional, IsString } from "class-validator";
import { CommentsEntity } from "../entities/comments.entity";
import { PostsEntity } from "../../posts/entities/posts.entity";

export class CommentUpdateDTO {
    @IsString()
    @IsOptional()
    comment: string;

    @IsString()
    @IsOptional()
    reaction: string;

    @IsString()
    @IsOptional()
    author_id: CommentsEntity;

    @IsString()
    @IsOptional()
    post_id: PostsEntity;
}
