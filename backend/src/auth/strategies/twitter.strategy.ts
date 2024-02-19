import { Injectable, UnauthorizedException } from '@nestjs/common';
import { PassportStrategy } from '@nestjs/passport';
import { AuthService } from '../services/auth.service';
import { Strategy } from '@superfaceai/passport-twitter-oauth2';


/**
 * Passport strategy for Twitter authentication.
 */
@Injectable()
export class TwitterStrategy extends PassportStrategy(Strategy, 'twitter') {
  constructor(private authService: AuthService) {
    super({
      clientID: process.env.APP_AUTH_TWITTER_ID,
      clientSecret: process.env.APP_AUTH_TWITTER_SECRET,
      clientType: 'confidential',
      callbackURL: `http://${process.env.APP_HOST}:${process.env.APP_PORT}/auth/twitter/callback`,
    });
  }

  /**
   * Validates the Twitter authentication token and returns the user profile.
   * @param token - The Twitter authentication token.
   * @param secret - The Twitter authentication secret.
   * @param profile - The user profile obtained from Twitter.
   * @returns The validated user profile.
   * @throws UnauthorizedException if the user profile is not available.
   */
  async validate(token: string, secret: string, profile: any): Promise<any> {
    if (!profile) {
      throw new UnauthorizedException();
    }
    return {
      id: profile.id,
      username: profile.username,
      displayName: profile.displayName,
    };
  }
}
