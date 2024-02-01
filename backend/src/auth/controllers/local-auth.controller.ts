import { Controller, Post, UseGuards, Body } from '@nestjs/common';
import { ApiParam, ApiTags } from '@nestjs/swagger';

import { LocalAuthGuard } from '../guards/local-auth.guard';
import { AuthService } from '../services/auth.service';
import { AuthDTO } from '../dto/auth.dto';
import { PublicAccess } from '../decorators/public.decorator';
import { SWAGGER_ID_EXAMPLE } from '../../constants/swagger.examples';


@ApiTags('Auth-Local')
@Controller('auth')
@UseGuards(LocalAuthGuard)
export class LocalAuthController {
  constructor(private readonly authService: AuthService) {}

  @ApiParam({
    name: 'password',
    type: 'string',
    required: true,
    example: 'admin123',
    description: 'The user uuid to delete their data.'
  })
  @ApiParam({
    name: 'username',
    type: 'string',
    required: true,
    example: 'admin',
    description: 'The user uuid to delete their data.'
  })
  @PublicAccess()
  @Post('login')
  async login(@Body() { username, password }: AuthDTO) {
    return this.authService.login({ username, password });
  }
}