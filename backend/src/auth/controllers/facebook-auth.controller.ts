import { Controller, Request, UseGuards, Get, HttpStatus } from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';

import { AuthService } from '../services/auth.service';
import { FacebookAuthGuard } from '../guards/facebook-auth.guard';


@ApiTags('Auth-Facebook')
@Controller()
export class FacebookAuthController {
  constructor(private authService: AuthService) {}

  @Get("/facebook")
  @UseGuards(FacebookAuthGuard)
  async facebookLogin(): Promise<any> {
    return HttpStatus.OK;
  }

  @Get("/facebook/redirect")
  @UseGuards(FacebookAuthGuard)
  async facebookLoginRedirect(@Request() req): Promise<any> {
    return this.authService.login(req.user);
  }
}
