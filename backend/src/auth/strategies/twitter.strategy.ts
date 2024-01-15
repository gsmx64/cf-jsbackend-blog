import { Injectable, UnauthorizedException } from '@nestjs/common';
import { PassportStrategy } from '@nestjs/passport';
import { AuthService } from '../services/auth.service';
import { Strategy } from '@superfaceai/passport-twitter-oauth2';

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
