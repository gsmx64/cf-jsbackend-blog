import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { UserModule } from './user/user.module';
import { UsersModule } from './users/users.module';
import { StoryModule } from './story/story.module';
import { StoriesModule } from './stories/stories.module';

@Module({
  imports: [
    ConfigModule.forRoot({
      envFilePath: '.development.env',
      isGlobal: true,
    }), 
    UserModule, 
    UsersModule, 
    StoryModule, 
    StoriesModule
  ]
})
export class AppModule {}
