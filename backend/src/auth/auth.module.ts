/**
 * This module handles authentication-related functionality.
 * It provides services, strategies, and controllers for various authentication methods such as JWT, local, Facebook, Google, and Twitter.
 * The module is global, meaning it can be used across multiple modules in the application.
 */
import { Global, Module, Type } from '@nestjs/common';
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


function getProviders(): Array<Type<unknown>> {
  const providers: Array<Type<unknown>> = [];
  providers.push(AuthService)
  providers.push(UsersService)

  if(String(process.env.APP_AUTH_FACEBOOK_ENABLE) === 'true')
    providers.push(FacebookStrategy)

  if(String(process.env.APP_AUTH_GOOGLE_ENABLE) === 'true')
    providers.push(GoogleStrategy)

  if(String(process.env.APP_AUTH_TWITTER_ENABLE) === 'true')
    providers.push(TwitterStrategy)

  providers.push(JwtAuthController)
  providers.push(LocalStrategy)

  return providers;
}

function getControllers(): Array<Type<unknown>> {
  const controllers: Array<Type<unknown>> = [];
  
  if(String(process.env.APP_AUTH_FACEBOOK_ENABLE) === 'true')
    controllers.push(FacebookAuthController)

  if(String(process.env.APP_AUTH_GOOGLE_ENABLE) === 'true')
    controllers.push(GoogleOauthController)

  if(String(process.env.APP_AUTH_TWITTER_ENABLE) === 'true')
    controllers.push(TwitterOAuthController)
  
  controllers.push(JwtAuthController)
  controllers.push(LocalAuthController)

  return controllers;
}

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
  providers: getProviders(),
  /*[
    AuthService,
    UsersService,
    (String(process.env.APP_AUTH_FACEBOOK_ENABLE) === 'true') ? FacebookStrategy : undefined,
    (String(process.env.APP_AUTH_GOOGLE_ENABLE) === 'true') ? GoogleStrategy : undefined,
    (String(process.env.APP_AUTH_TWITTER_ENABLE) === 'true') ? TwitterStrategy : undefined,
    JwtStrategy,
    LocalStrategy
  ],*/
  controllers: getControllers(),
  /*[
    (String(process.env.APP_AUTH_FACEBOOK_ENABLE) === 'true') ? FacebookAuthController : undefined,
    (String(process.env.APP_AUTH_GOOGLE_ENABLE) === 'true') ? GoogleOauthController : undefined,
    (String(process.env.APP_AUTH_TWITTER_ENABLE) === 'true') ? TwitterOAuthController : undefined,
    JwtAuthController,
    LocalAuthController
  ],*/
  exports: [],
})

export class AuthModule {}