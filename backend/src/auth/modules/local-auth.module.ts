import { Module } from '@nestjs/common';
import { LocalAuthController } from '../controllers/local-auth.controller';
import { LocalStrategy } from '../strategies/local.strategy';
import { AuthService } from '../services/auth.service';
import { JwtStrategy } from '../strategies/jwt.strategy';
import { UsersModule } from 'src/users/users.module';
import { PassportModule } from '@nestjs/passport';

@Module({
  imports: [
    UsersModule,
    PassportModule
  ],
  controllers: [LocalAuthController],
  providers: [LocalStrategy, JwtStrategy],
  exports: []
})
export class LocalAuthModule {}
