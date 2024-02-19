import { Injectable } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';

/**
 * FacebookAuthGuard class is an implementation of the AuthGuard class
 * specifically for Facebook authentication.
 */
@Injectable()
export class FacebookAuthGuard extends AuthGuard('facebook') {}
