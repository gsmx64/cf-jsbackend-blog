import { Controller, Request, UseGuards, Get } from '@nestjs/common';
import { AuthService } from '../services/auth.service';
import { TwitterOauthGuard } from '../guards/twitter-oauth.guard';

@Controller()
export class TwitterOAuthController {
  constructor(private authService: AuthService) {}

  @UseGuards(TwitterOauthGuard)
  @Get('auth/twitter')
  async twitterLogin() {
    return;
  }

  @Get('auth/twitter/callback')
  @UseGuards(TwitterOauthGuard)
  async twitterLoginCallback(@Request() req) {
    return this.authService.login(req.user);
  }
}
