import { Injectable } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';

/**
 * JwtAuthGuard class is responsible for guarding routes using JWT authentication.
 * It extends the AuthGuard class and specifies the 'jwt' strategy.
 */
@Injectable()
export class JwtAuthGuard extends AuthGuard('jwt') {}
