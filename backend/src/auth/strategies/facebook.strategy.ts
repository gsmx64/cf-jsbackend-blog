import { Injectable } from "@nestjs/common";
import { PassportStrategy } from "@nestjs/passport";
import { Profile, Strategy } from "passport-facebook";


/**
 * Passport strategy for Facebook authentication.
 */
@Injectable()
export class FacebookStrategy extends PassportStrategy(Strategy, "facebook") {
  constructor() {
    super({
      clientID: process.env.APP_AUTH_FACEBOOK_KEY,
      clientSecret: process.env.APP_AUTH_FACEBOOK_SECRET,
      callbackURL: `http://${process.env.APP_HOST}:${process.env.APP_PORT}/facebook/redirect`,
      scope: 'email',
      profileFields: ['emails', 'name'],
    });
  }

  /**
   * Validates the Facebook authentication and returns the user information.
   * @param accessToken - The access token provided by Facebook.
   * @param refreshToken - The refresh token provided by Facebook.
   * @param profile - The user profile returned by Facebook.
   * @param done - The callback function to be called when validation is complete.
   * @returns A Promise that resolves to the user information and access token.
   */
  async validate(
    accessToken: string,
    refreshToken: string,
    profile: Profile,
    done: (err: any, user: any, info?: any) => void
  ): Promise<any> {
    const { name, emails } = profile;
    const user = {
      email: emails[0].value,
      firstName: name.givenName,
      lastName: name.familyName,
    };
    const payload = {
      user,
      accessToken,
    };

    done(null, payload);
  }
}

