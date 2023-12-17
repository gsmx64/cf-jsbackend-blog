import { Controller, Get } from '@nestjs/common';
import { PostsService } from '../services/posts.service';

@Controller('stories')
export class PostsController {
  constructor(private readonly postsService: PostsService) {}

  @Get('say-hello')
  getHello(): string {
    return this.postsService.getHello();
  }
}
