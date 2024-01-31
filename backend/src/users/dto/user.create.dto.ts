import { Type } from "class-transformer";
import { IsArray, IsEmail, IsEnum, IsNotEmpty, IsNumber, IsOptional,
            IsString, Length, ValidateNested} from "class-validator";
import { ApiProperty } from "@nestjs/swagger";

import { CommentCreateDTO } from "../../comments/dto/comment.create.dto";
import { ROLES } from "../../constants/roles";
import { PostCreateDTO } from "../../posts/dto/post.create.dto";
import { CategoryCreateDTO } from "../../categories/dto/category.create.dto";
import { USER_STATUS } from "../../constants/user.status";


export class UserCreateDTO {
    @ApiProperty()
    @IsNotEmpty({ message: 'Please enter an username' })
    @IsString()
    username: string;
    
    @ApiProperty()
    @IsNotEmpty({ message: 'Please enter your email' })
    @IsEmail()
    email: string;

    @ApiProperty()
    @IsNotEmpty()
    @IsString()
    @Length(8, 40, {
        message: 'Password length Must be between 8 and 40 charcters',
    })
    password: string;

    @ApiProperty()
    @IsNotEmpty()
    @IsEnum(USER_STATUS)
    status: USER_STATUS;
    
    @ApiProperty()
    @IsNotEmpty()
    @IsEnum(ROLES)
    role: ROLES;

    @ApiProperty()
    @IsNumber()
    karma: number;

    @ApiProperty()
    @IsOptional()
    @IsString()
    avatar: string;

    @ApiProperty()
    @IsNotEmpty({ message: 'Please enter your name' })
    @IsString({ message: 'Please enter a valid name' })
    firstName: string;

    @ApiProperty()
    @IsNotEmpty({ message: 'Please enter your lastname' })
    @IsString({ message: 'Please enter a valid lastname' })
    lastName: string;    

    @ApiProperty()
    @IsNotEmpty({ message: 'Please enter your age' })
    @IsNumber()
    age: number;

    @ApiProperty()
    @IsNotEmpty({ message: 'Please enter your city' })
    @IsString({ message: 'Please enter a valid city' })
    city: string;

    @ApiProperty()
    @IsNotEmpty({ message: 'Please enter your country' })
    @IsString({ message: 'Please enter a valid country' })
    country: string;

    @ApiProperty()
    @ValidateNested()
    @IsArray()
    @Type(() => PostCreateDTO)
    @IsOptional()
    posts: PostCreateDTO[];

    @ApiProperty()
    @ValidateNested()
    @IsArray()
    @Type(() => CategoryCreateDTO)
    @IsOptional()
    categories: CategoryCreateDTO[];

    @ApiProperty()
    @ValidateNested()
    @IsArray()
    @Type(() => CommentCreateDTO)
    @IsOptional()
    comments: CommentCreateDTO[];
}
