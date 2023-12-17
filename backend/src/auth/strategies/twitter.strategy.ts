import { Strategy } from 'passport-twitter';
import { PassportStrategy } from '@nestjs/passport';
import { Injectable, UnauthorizedException } from '@nestjs/common';
import { AuthService } from '../auth.service';
import { ConfigService } from '@nestjs/config';

@Injectable()
export class TwitterStrategy extends PassportStrategy(Strategy, 'twitter') {
  constructor(private authService: AuthService, configService: ConfigService) {
    super({
      consumerKey: configService.get('APP_AUTH_TWITTER_KEY'),
      consumerSecret: configService.get('APP_AUTH_TWITTER_SECRET'),
      callbackURL: 'http://localhost:3000/auth/twitter/callback',
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
