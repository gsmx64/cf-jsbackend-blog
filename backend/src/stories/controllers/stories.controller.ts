import { Controller, Get } from '@nestjs/common';
import { StoriesService } from '../services/stories.service';

@Controller('stories')
export class StoriesController {
  constructor(private readonly storiesService: StoriesService) {}

  @Get('say-hello')
  getHello(): string {
    return this.storiesService.getHello();
  }
}
