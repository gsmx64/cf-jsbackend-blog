import { Module } from '@nestjs/common';
import { StoryService } from './services/story.service';
import { StoryController } from './controllers/story.controller';

@Module({
  providers: [StoryService],
  controllers: [StoryController]
})
export class StoryModule {}
