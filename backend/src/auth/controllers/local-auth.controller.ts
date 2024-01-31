import { Controller, Post, UseGuards, Body } from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';

import { LocalAuthGuard } from '../guards/local-auth.guard';
import { AuthService } from '../services/auth.service';
import { AuthDTO } from '../dto/auth.dto';
import { PublicAccess } from '../decorators/public.decorator';


@ApiTags('Auth-Local')
@Controller('auth')
@UseGuards(LocalAuthGuard)
export class LocalAuthController {
  constructor(private readonly authService: AuthService) {}

  @PublicAccess()
  @Post('login')
  async login(@Body() { username, password }: AuthDTO) {
    return this.authService.login({ username, password });
  }
}