import { IsEnum, IsNotEmpty, IsNumber, IsOptional, IsString } from "class-validator";

export class PostDTO {
    @IsNotEmpty({ message: 'Please enter a title' })
    @IsString({ message: 'Please enter a valid title' })
    title: string;

    @IsNotEmpty({ message: 'Please enter a description' })
    @IsString({ message: 'Please enter a valid description' })
    description: string;

    @IsNotEmpty({ message: 'Please write some content' })
    @IsString({ message: 'Please enter a valid content' })
    content: string;

    @IsNotEmpty()
    @IsNumber()
    status: number;

    @IsNotEmpty()
    @IsNumber()
    catid: number;
}

export class PostUpdateDTO {
    @IsOptional()
    @IsString()
    title: string;

    @IsOptional()
    @IsString()
    description: string;

    @IsOptional()
    @IsString()
    content: string;

    @IsOptional()
    @IsNumber()
    status: number;

    @IsOptional()
    @IsNumber()
    catid: number;
}