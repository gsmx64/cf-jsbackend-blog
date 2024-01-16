import { Type } from "class-transformer";
import { IsArray, IsEmail, IsEnum, IsNotEmpty, IsNumber, IsOptional,
            IsString, Length, 
            ValidateNested} from "class-validator";
import { PostDTO } from "../../posts/dto/post.dto";
import { CommentDTO } from "../../comments/dto/comment.dto";
import { ROLES } from "../../constants/roles";

export class UserDTO {
    @IsNotEmpty({ message: 'Please enter an username' })
    @IsString()
    username: string;

    @IsNotEmpty()
    @IsString()
    @Length(8, 50, {
        message: 'Password length Must be between 8 and 50 charcters',
    })
    password: string;

    @IsNotEmpty()
    @IsNumber()
    status: number;
    
    @IsNotEmpty()
    @IsEnum(ROLES)
    role: ROLES;

    @IsString()
    karma: string;

    @IsOptional()
    @IsString()
    avatar: string;

    @IsNotEmpty({ message: 'Please enter your name' })
    @IsString({ message: 'Please enter a valid name' })
    firstName: string;

    @IsNotEmpty({ message: 'Please enter your lastname' })
    @IsString({ message: 'Please enter a valid lastname' })
    lastName: string;

    @IsNotEmpty({ message: 'Please enter your email' })
    @IsEmail()
    email: string;

    @IsNotEmpty({ message: 'Please enter your age' })
    @IsNumber()
    age: number;

    @IsNotEmpty({ message: 'Please enter your city' })
    @IsString({ message: 'Please enter a valid city' })
    city: string;

    @IsNotEmpty({ message: 'Please enter your country' })
    @IsString({ message: 'Please enter a valid country' })
    country: string;

    @ValidateNested()
    @IsArray()
    @Type(() => PostDTO)
    @IsOptional()
    posts: PostDTO[];

    @ValidateNested()
    @IsArray()
    @Type(() => CommentDTO)
    @IsOptional()
    comments: CommentDTO[];
}
