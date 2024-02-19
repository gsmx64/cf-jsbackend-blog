import { Type } from "class-transformer";
import { IsArray, IsEmail, IsEnum, IsNotEmpty, IsNumber, IsOptional,
            IsString, Length, ValidateNested} from "class-validator";
import { ApiProperty } from "@nestjs/swagger";

import { CommentCreateDTO } from "../../comments/dto/comment.create.dto";
import { ROLES } from "../../constants/roles";
import { PostCreateDTO } from "../../posts/dto/post.create.dto";
import { CategoryCreateDTO } from "../../categories/dto/category.create.dto";
import { USER_STATUS } from "../../constants/user.status";


/**
 * Data transfer object for creating a user.
 */
export class UserCreateDTO {
    /**
     * The username of the user.
     */
    @ApiProperty()
    @IsNotEmpty({ message: 'Please enter an username' })
    @IsString()
    username: string;
    
    /**
     * The email of the user.
     */
    @ApiProperty()
    @IsNotEmpty({ message: 'Please enter your email' })
    @IsEmail()
    email: string;

    /**
     * The password of the user.
     */
    @ApiProperty()
    @IsNotEmpty()
    @IsString()
    @Length(8, 40, {
        message: 'Password length Must be between 8 and 40 charcters',
    })
    password: string;

    /**
     * The status of the user.
     */
    @ApiProperty()
    @IsNotEmpty()
    @IsEnum(USER_STATUS)
    status: USER_STATUS;
    
    /**
     * The role of the user.
     */
    @ApiProperty()
    @IsNotEmpty()
    @IsEnum(ROLES)
    role: ROLES;

    /**
     * The karma of the user.
     */
    @ApiProperty()
    @IsNumber()
    karma: number;

    /**
     * The avatar of the user.
     */
    @ApiProperty()
    @IsOptional()
    @IsString()
    avatar: string;

    /**
     * The first name of the user.
     */
    @ApiProperty()
    @IsNotEmpty({ message: 'Please enter your name' })
    @IsString({ message: 'Please enter a valid name' })
    firstName: string;

    /**
     * The last name of the user.
     */
    @ApiProperty()
    @IsNotEmpty({ message: 'Please enter your lastname' })
    @IsString({ message: 'Please enter a valid lastname' })
    lastName: string;    

    /**
     * The age of the user.
     */
    @ApiProperty()
    @IsNotEmpty({ message: 'Please enter your age' })
    @IsNumber()
    age: number;

    /**
     * The city of the user.
     */
    @ApiProperty()
    @IsNotEmpty({ message: 'Please enter your city' })
    @IsString({ message: 'Please enter a valid city' })
    city: string;

    /**
     * The country of the user.
     */
    @ApiProperty()
    @IsNotEmpty({ message: 'Please enter your country' })
    @IsString({ message: 'Please enter a valid country' })
    country: string;

    /**
     * The posts created by the user.
     */
    @ApiProperty()
    @ValidateNested()
    @IsArray()
    @Type(() => PostCreateDTO)
    @IsOptional()
    posts: PostCreateDTO[];

    /**
     * The categories created by the user.
     */
    @ApiProperty()
    @ValidateNested()
    @IsArray()
    @Type(() => CategoryCreateDTO)
    @IsOptional()
    categories: CategoryCreateDTO[];

    /**
     * The comments created by the user.
     */
    @ApiProperty()
    @ValidateNested()
    @IsArray()
    @Type(() => CommentCreateDTO)
    @IsOptional()
    comments: CommentCreateDTO[];
}
