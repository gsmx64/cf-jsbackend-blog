import { Controller, Post, UseGuards, Body } from '@nestjs/common';
import { ApiParam, ApiTags } from '@nestjs/swagger';

import { LocalAuthGuard } from '../guards/local-auth.guard';
import { AuthService } from '../services/auth.service';
import { AuthDTO } from '../dto/auth.dto';
import { PublicAccess } from '../decorators/public.decorator';
import { SWAGGER_ID_EXAMPLE } from '../../constants/swagger.examples';


/**
 * Controller for local authentication.
 * Handles login requests using username and password.
 */
@ApiTags('Auth-Local')
@Controller('auth')
@UseGuards(LocalAuthGuard)
export class LocalAuthController {
  constructor(private readonly authService: AuthService) {}

  /**
   * Logs in a user with the provided username and password.
   * @param {AuthDTO} body - The request body containing the username and password.
   * @returns {Promise<any>} - The result of the login operation.
   */
  @ApiParam({
    name: 'password',
    type: 'string',
    required: true,
    example: 'admin123',
    description: 'The user password for login.'
  })
  @ApiParam({
    name: 'username',
    type: 'string',
    required: true,
    example: 'admin',
    description: 'The username for login.'
  })
  @PublicAccess()
  @Post('login')
  async login(@Body() { username, password }: AuthDTO): Promise<any> {
    return this.authService.login({ username, password });
  }
}