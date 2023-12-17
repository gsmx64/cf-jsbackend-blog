import { Controller, Get } from '@nestjs/common';
import { CommentsService } from '../services/comments.service';

@Controller('story')
export class CommentsController {
  constructor(private readonly commentsService: CommentsService) {}

  @Get('say-hello')
  getHello(): string {
    return this.commentsService.getHello();
  }
}
