import { IsNotEmpty, IsString } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

import { AuthBody } from '../interfaces/auth.interface';


/**
 * Represents the data transfer object for authentication.
 */
export class AuthDTO implements AuthBody {
  /**
   * The username for authentication.
   */
  @ApiProperty()
  @IsNotEmpty()
  @IsString()
  username: string;
  
  /**
   * The password for authentication.
   */
  @ApiProperty()
  @IsNotEmpty()
  @IsString()
  password: string;
}
