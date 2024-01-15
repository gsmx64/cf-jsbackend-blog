import { Body, Controller, Get, Param, Post, UseGuards } from '@nestjs/common';
import { CommentsService } from '../services/comments.service';
import { CommentDTO, CommentUpdateDTO } from '../dto/comment.dto';
import { LocalAuthGuard } from 'src/auth/guards/local-auth.guard';
import { PublicAccess } from 'src/auth/decorators/public.decorator';

@Controller('comments')
@UseGuards(LocalAuthGuard)
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

  @PublicAccess()
  @Get('view/:id')
  public async findOneComment(
    @Param('id') id: string
  ) {
    return this.commentsService.findOneComment(id);
  }

  @PublicAccess()
  @Get('list')
  public async findAllComments() {
    return this.commentsService.findAllComments();
  }
}
