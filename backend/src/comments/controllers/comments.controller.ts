import { Body, Controller, Get, Param, Post } from '@nestjs/common';
import { CommentsService } from '../services/comments.service';
import { CommentDTO, CommentUpdateDTO } from '../dto/comment.dto';

@Controller('story')
export class CommentsController {
  constructor(private readonly commentsService: CommentsService) {}

  @Post('create')
  public async createComment(
    @Body() body: CommentDTO
  ) {
    return this.commentsService.createComment(body);
  }

  @Get('edit/:id')
  public async updateComment(
    @Param('id') id: string, 
    @Body() body: CommentUpdateDTO
  ) {
    return this.commentsService.updateComment(body, id);
  }

  @Get('delete/:id')
  public async deleteComment(
    @Param('id') id: string
  ) {
    return this.commentsService.deleteComment(id);
  }

  @Get('comment/:id')
  public async findOneComment(
    @Param('id') id: string
  ) {
    return this.commentsService.findOneComment(id);
  }

  @Get('commentslist')
  public async findAllComments() {
    return this.commentsService.findAllComments();
  }
}
