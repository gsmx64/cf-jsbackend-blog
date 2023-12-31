import { IsEmail, IsEnum, IsNotEmpty, IsNumber, IsOptional, IsString, Length } from "class-validator";
import { ROLES } from "src/constants/roles";

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

    @IsNotEmpty()
    @IsString()
    karma: string;

    @IsNotEmpty()
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
}

export class UserUpdateDTO {
    @IsOptional()
    @IsString()
    username: string;

    @IsOptional()
    @IsString()
    password: string;

    @IsOptional()
    @IsNumber()
    status: number;
    
    @IsOptional()
    @IsEnum(ROLES)
    role: ROLES;

    @IsOptional()
    @IsString()
    karma: string;

    @IsOptional()
    @IsString()
    avatar: string;

    @IsOptional()
    @IsString()
    firstName: string;

    @IsOptional()
    @IsString()
    lastName: string;

    @IsOptional()
    @IsString()
    email: string;

    @IsOptional()
    @IsNumber()
    age: number;

    @IsOptional()
    @IsString()
    city: string;

    @IsOptional()
    @IsString()
    country: string;
}