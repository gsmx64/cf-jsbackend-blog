import { Strategy } from 'passport-local';
import { PassportStrategy } from '@nestjs/passport';
import { Injectable, UnauthorizedException } from '@nestjs/common';

import { AuthService } from '../services/auth.service';


/**
 * Local strategy for passport authentication.
 */
@Injectable()
export class LocalStrategy extends PassportStrategy(Strategy) {
  constructor(private authService: AuthService) {
    super();
  }

  /**
   * Validates the user's credentials.
   * @param username - The username provided by the user.
   * @param password - The password provided by the user.
   * @returns A Promise that resolves to the authenticated user.
   * @throws UnauthorizedException if the user is not valid.
   */
  async validate(username: string, password: string): Promise<any> {
    const user = await this.authService.validateUser(username, password);
    if (!user) {
      throw new UnauthorizedException();
    }
    return user;
  }
}
