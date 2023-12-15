import { Module } from '@nestjs/common';
import { StoriesService } from './services/stories.service';
import { StoriesController } from './controllers/stories.controller';

@Module({
  providers: [StoriesService],
  controllers: [StoriesController]
})
export class StoriesModule {}
