import { Module } from '@nestjs/common';
import { AuthController } from './auth.controller';
import { AuthService } from './auth.service';
import { LocalStrategy } from './strategies/local.strategy';
import { PassportModule } from '@nestjs/passport';
import { JwtModule } from '@nestjs/jwt';
import { JwtStrategy } from './strategies/jwt.strategy';
import { TwitterStrategy } from './strategies/twitter.strategy';
import { FacebookStrategy } from './strategies/facebook.strategy';
import { ConfigService } from '@nestjs/config';

@Module({
  imports: [
      PassportModule,
      JwtModule.registerAsync({
        useFactory: async (configService: ConfigService) => ({
            secretOrPrivateKey: configService.get('APP_AUTH_SECRET'),
            signOptions: {
                expiresIn: configService.get('APP_AUTH_TOKEN_EXPIRATION'),
            },
        }),
        inject: [ConfigService],
    }),
  ],
  providers: [
              AuthService,
              LocalStrategy,
              JwtStrategy,
              TwitterStrategy,
              FacebookStrategy
            ],
  controllers: [AuthController],
  exports: [AuthService],
})
export class AuthModule {}
