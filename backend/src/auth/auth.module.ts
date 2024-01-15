import { Global, Module } from '@nestjs/common';
import { PassportModule } from '@nestjs/passport';
import { JwtModule, JwtService } from '@nestjs/jwt';

import { AuthService } from './services/auth.service';

/*import { FacebookAuthModule } from './modules/facebook-auth.module';
import { GoogleOauthModule } from './modules/google-oauth.module';
import { JwtAuthModule } from './modules/jwt-auth.module';
import { LocalAuthModule } from './modules/local-auth.module';
import { TwitterOauthModule } from './modules/twitter-oauth.module';
*/

import { FacebookStrategy } from './strategies/facebook.strategy';
import { GoogleStrategy } from './strategies/google-oauth.strategy';
import { JwtStrategy } from './strategies/jwt.strategy';
import { LocalStrategy } from './strategies/local.strategy';
import { TwitterStrategy } from './strategies/twitter.strategy';

import { FacebookAuthController } from './controllers/facebook-auth.controller';
import { GoogleOauthController } from './controllers/google-oauth.controller';
import { JwtAuthController } from './controllers/jwt-auth.controller.ts';
import { LocalAuthController } from './controllers/local-auth.controller';
import { TwitterOAuthController } from './controllers/twitter-oauth.controller';

import { UsersService } from 'src/users/services/users.service';
import { UsersEntity } from 'src/users/entities/users.entity';
import { UsersPostsEntity } from 'src/users/entities/usersPosts.entity';
import { UsersCommentsEntity } from 'src/users/entities/usersComments.entity';
import { UsersModule } from 'src/users/users.module';
import { JwtAuthModule } from './modules/jwt-auth.module';


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
    /*FacebookAuthModule,
    GoogleOauthModule,
    JwtAuthModule,
    LocalAuthModule,
    TwitterOauthModule*/
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
