import { Module } from '@nestjs/common';
import { JwtAuthController } from '../controllers/jwt-auth.controller.ts';
import { JwtStrategy } from '../strategies/jwt.strategy';

@Module({
  imports: [],
  controllers: [JwtAuthController],
  providers: [JwtStrategy],
})
export class JwtAuthModule {}
