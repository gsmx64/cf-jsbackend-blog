import { Injectable } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';

/**
 * Guard that implements Google OAuth authentication strategy.
 */
@Injectable()
export class GoogleOauthGuard extends AuthGuard('google') {}
