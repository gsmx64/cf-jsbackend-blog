import { PassportStrategy } from '@nestjs/passport';
import { Profile, Strategy } from 'passport-google-oauth20';
import { Injectable } from '@nestjs/common';


/**
 * Passport strategy for Google OAuth2 authentication.
 */
@Injectable()
export class GoogleStrategy extends PassportStrategy(Strategy, 'google') {
  constructor() {
    super({
      // Put config in `.env`
      clientID: process.env.APP_AUTH_GOOGLE_ID,
      clientSecret: process.env.APP_AUTH_GOOGLE_SECRET,
      callbackURL: `http://${process.env.APP_HOST}:${process.env.APP_PORT}/google/redirect`,
      scope: ['email', 'profile'],
    });
  }

  /**
   * Validates the Google OAuth2 access token and returns a custom User object.
   * @param _accessToken - The access token provided by Google.
   * @param _refreshToken - The refresh token provided by Google.
   * @param profile - The user profile returned by Google.
   * @returns A custom User object with provider, providerId, name, and username properties.
   */
  async validate(
    _accessToken: string,
    _refreshToken: string,
    profile: Profile,
  ) {
    const { id, name, emails } = profile;

    // Here a custom User object is returned. In the the repo I'm using a UsersService with repository pattern,
    // learn more here: https://docs.nestjs.com/techniques/database
    return {
      provider: 'google',
      providerId: id,
      name: name.givenName,
      username: emails[0].value,
    };
  }
}
