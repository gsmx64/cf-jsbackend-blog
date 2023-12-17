import { Controller, Request, Post, UseGuards, Get, HttpStatus, Req } from '@nestjs/common';
import { LocalAuthGuard } from './guards/local-auth.guard';
import { AuthService } from './auth.service';
import { JwtAuthGuard } from './guards/jwt-auth.guard';
import { TwitterAuthGuard } from './guards/twitter-auth.guard';
import { FacebookAuthGuard } from './guards/facebook-auth.guard';

@Controller()
export class AuthController {
  constructor(private authService: AuthService) {}

  @UseGuards(LocalAuthGuard)
  @Post('auth/login')
  login(@Request() req) {
    return this.authService.login(req.user);
  }

  @UseGuards(TwitterAuthGuard)
  @Get('auth/twitter')
  async twitterLogin() {
    return;
  }

  @Get('auth/twitter/callback')
  @UseGuards(TwitterAuthGuard)
  async twitterLoginCallback(@Request() req) {
    return this.authService.login(req.user);
  }

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

  @UseGuards(JwtAuthGuard)
  @Get('profile')
  getUserProfile(@Request() req) {
    return req.user;
  }

  @UseGuards(JwtAuthGuard)
  @Get('users')
  getUsersList(@Request() req) {
    return req.user;
  }
}
