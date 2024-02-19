import { Injectable } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';

/**
 * Twitter OAuth Guard.
 * This guard is responsible for authenticating requests using Twitter OAuth strategy.
 */
@Injectable()
export class TwitterOauthGuard extends AuthGuard('twitter') {}
