import { Controller, Get, Req, Res, UseGuards } from '@nestjs/common';
import { Request, Response } from 'express';
import { ApiTags } from '@nestjs/swagger';

import { GoogleOauthGuard } from '../guards/google-oauth.guard';
import { AuthService } from '../services/auth.service';


/**
 * Controller for handling Google OAuth authentication.
 * This controller provides endpoints for initiating Google OAuth authentication
 * and handling the authentication redirect.
 */
@ApiTags('Auth-Google')
@Controller('auth/google')
export class GoogleOauthController {
  constructor(private authService: AuthService) {}

  /**
   * Endpoint for initiating Google OAuth authentication.
   * This endpoint is used to initiate the Google OAuth authentication flow.
   * It redirects the user to the Google OAuth consent screen.
   */
  @Get()
  @UseGuards(GoogleOauthGuard)
  async googleAuth(@Req() _req) {
    // Guard redirects
  }

  /**
   * Endpoint for handling the Google OAuth authentication redirect.
   * This endpoint is used to handle the redirect from the Google OAuth consent screen.
   * It receives the authentication response from Google and returns the user object.
   * @param req The Express request object.
   * @param res The Express response object.
   * @returns The user object received from Google.
   */
  @Get('redirect')
  @UseGuards(GoogleOauthGuard)
  async googleAuthRedirect(@Req() req: Request, @Res() res: Response) {
    // For now, we'll just show the user object
    return req.user;
  }
}
