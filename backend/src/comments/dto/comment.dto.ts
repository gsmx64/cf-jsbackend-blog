import { IsEnum, IsNotEmpty, IsNumber, IsOptional, IsString } from "class-validator";

export class CommentDTO {
    @IsNotEmpty({ message: 'Please enter a comment' })
    @IsString({ message: 'Please enter a valid comment' })
    comment: string;

    @IsNotEmpty()
    @IsNumber()
    author_id: number;

    @IsNotEmpty()
    @IsString()
    reaction: string;
}

export class CommentUpdateDTO {
    @IsOptional()
    @IsString()
    comment: string;

    @IsOptional()
    @IsNumber()
    author_id: number;

    @IsOptional()
    @IsString()
    reaction: string;
}