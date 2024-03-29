/**
 * This module handles authentication-related functionality.
 * It provides services, strategies, and controllers for various authentication methods such as JWT, local, Facebook, Google, and Twitter.
 * The module is global, meaning it can be used across multiple modules in the application.
 */
import { Global, Module } from '@nestjs/common';
import { PassportModule } from '@nestjs/passport';
import { JwtModule } from '@nestjs/jwt';

import { AuthService } from './services/auth.service';
import { UsersService } from '../users/services/users.service';
import { UsersModule } from '../users/users.module';

import { FacebookStrategy } from './strategies/facebook.strategy';
import { GoogleStrategy } from './strategies/google.strategy';
import { JwtStrategy } from './strategies/jwt.strategy';
import { LocalStrategy } from './strategies/local.strategy';
import { TwitterStrategy } from './strategies/twitter.strategy';

import { FacebookAuthController } from './controllers/facebook-auth.controller';
import { GoogleOauthController } from './controllers/google-oauth.controller';
import { JwtAuthController } from './controllers/jwt-auth.controller.ts';
import { LocalAuthController } from './controllers/local-auth.controller';
import { TwitterOAuthController } from './controllers/twitter-oauth.controller';


@Global()
@Module({
  imports: [
      PassportModule,
      JwtModule.registerAsync({
        useFactory: async () => ({
          secret: process.env.APP_AUTH_SECRET,
            signOptions: {
                expiresIn: process.env.APP_AUTH_TOKEN_EXPIRATION,
            },
        }),
        inject: [],
    }),
    UsersModule,
  ],
  providers: [
    AuthService, 
    UsersService,
    FacebookStrategy,
    GoogleStrategy,    
    JwtStrategy,
    LocalStrategy,
    TwitterStrategy
  ],
  controllers: [
    FacebookAuthController,
    GoogleOauthController,    
    JwtAuthController,
    LocalAuthController,
    TwitterOAuthController
  ],
  exports: [],
})

export class AuthModule {}