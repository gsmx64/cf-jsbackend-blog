import { Controller, Request, UseGuards, Get } from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';

import { AuthService } from '../services/auth.service';
import { TwitterOauthGuard } from '../guards/twitter-oauth.guard';


/**
 * Controller for handling Twitter OAuth authentication.
 */
@ApiTags('Auth-Twitter')
@Controller()
export class TwitterOAuthController {
  constructor(private authService: AuthService) {}

  /**
   * Endpoint for initiating Twitter OAuth login.
   * @returns Empty response.
   */
  @UseGuards(TwitterOauthGuard)
  @Get('auth/twitter')
  async twitterLogin() {
    return;
  }

  /**
   * Endpoint for handling Twitter OAuth callback.
   * @param req - The request object.
   * @returns The result of the login process.
   */
  @Get('auth/twitter/callback')
  @UseGuards(TwitterOauthGuard)
  async twitterLoginCallback(@Request() req) {
    return this.authService.login(req.user);
  }
}
