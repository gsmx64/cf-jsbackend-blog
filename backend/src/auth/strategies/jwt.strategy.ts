import { ExtractJwt, Strategy } from 'passport-jwt';
import { PassportStrategy } from '@nestjs/passport';
import { Injectable } from '@nestjs/common';
import { AuthService } from '../services/auth.service';


/**
 * JWT strategy for passport authentication.
 */
@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) {
  constructor(private authService: AuthService) {
    super({
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      ignoreExpiration: false,
      secretOrKey: process.env.APP_AUTH_SECRET,
    });
  }

  /**
   * Validates the payload extracted from the JWT.
   * @param payload - The payload object extracted from the JWT.
   * @returns An object containing the id and username from the payload.
   */
  async validate(payload: any) {
    return { id: payload.id, username: payload.username };
  }
}
