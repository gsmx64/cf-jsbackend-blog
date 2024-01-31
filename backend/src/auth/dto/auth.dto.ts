import { IsNotEmpty, IsString } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

import { AuthBody } from '../interfaces/auth.interface';


export class AuthDTO implements AuthBody {
  @ApiProperty()
  @IsNotEmpty()
  @IsString()
  username: string;
  
  @ApiProperty()
  @IsNotEmpty()
  @IsString()
  password: string;
}
