import { Controller, Request, UseGuards, Get, HttpStatus } from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';

import { AuthService } from '../services/auth.service';
import { FacebookAuthGuard } from '../guards/facebook-auth.guard';


/**
 * Controller for Facebook authentication.
 * Handles Facebook login and redirect.
 */
@ApiTags('Auth-Facebook')
@Controller()
export class FacebookAuthController {
  constructor(private authService: AuthService) {}

  /**
   * Endpoint for Facebook login.
   * @returns {Promise<any>} The HTTP status code indicating the success of the login.
   */
  @Get("/facebook")
  @UseGuards(FacebookAuthGuard)
  async facebookLogin(): Promise<any> {
    return HttpStatus.OK;
  }

  /**
   * Endpoint for Facebook login redirect.
   * @param {Request} req - The request object.
   * @returns {Promise<any>} The result of the login operation.
   */
  @Get("/facebook/redirect")
  @UseGuards(FacebookAuthGuard)
  async facebookLoginRedirect(@Request() req): Promise<any> {
    return this.authService.login(req.user);
  }
}
