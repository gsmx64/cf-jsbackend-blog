import { Controller, Get } from '@nestjs/common';
import { StoryService } from '../services/story.service';

@Controller('story')
export class StoryController {
  constructor(private readonly storyService: StoryService) {}

  @Get('say-hello')
  getHello(): string {
    return this.storyService.getHello();
  }
}
