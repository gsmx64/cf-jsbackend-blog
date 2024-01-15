import { Module } from '@nestjs/common';
import { GoogleOauthController } from '../controllers/google-oauth.controller';
import { GoogleStrategy } from '../strategies/google-oauth.strategy';

@Module({
  imports: [],
  controllers: [GoogleOauthController],
  providers: [GoogleStrategy],
})
export class GoogleOauthModule {}
