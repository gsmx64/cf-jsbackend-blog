import { Module } from '@nestjs/common';
import { TwitterOAuthController } from '../controllers/twitter-oauth.controller';
import { TwitterStrategy } from '../strategies/twitter.strategy';

@Module({
  imports: [],
  controllers: [TwitterOAuthController],
  providers: [TwitterStrategy],
})
export class TwitterOauthModule {}
