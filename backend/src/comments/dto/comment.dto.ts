import { IsEnum, IsNotEmpty, IsNumber, IsOptional, IsString } from "class-validator";

export class CommentDTO {
    @IsNotEmpty({ message: 'Please enter a comment' })
    @IsString({ message: 'Please enter a valid comment' })
    comment: string;

    @IsNotEmpty()
    @IsString()
    author_id: string;

    @IsNotEmpty()
    @IsString()
    reaction: string;
}

export class CommentUpdateDTO {
    @IsOptional()
    @IsString()
    comment: string;

    @IsOptional()
    @IsString()
    author_id: string;

    @IsOptional()
    @IsString()
    reaction: string;
}