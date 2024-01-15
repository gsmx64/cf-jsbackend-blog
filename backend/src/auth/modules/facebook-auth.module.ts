import { Module } from '@nestjs/common';
import { FacebookAuthController } from '../controllers/facebook-auth.controller';
import { FacebookStrategy } from '../strategies/facebook.strategy';

@Module({
  imports: [],
  controllers: [FacebookAuthController],
  providers: [FacebookStrategy],
})
export class FacebookAuthModule {}
