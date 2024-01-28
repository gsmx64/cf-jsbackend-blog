import { Body, Controller, Get, Param, Post, UseGuards } from '@nestjs/common';

import { CommentsService } from '../services/comments.service';
import { CommentDTO } from '../dto/comment.dto';
import { CommentUpdateDTO } from '../dto/comment.update.dto';
import { LocalAuthGuard } from '../../auth/guards/local-auth.guard';
import { LocalRolesGuard } from '../../auth/guards/local-auth.roles.guard';
import { AdminAccess } from '../../auth/decorators/admin.decorator';
import { PublicAccess } from '../../auth/decorators/public.decorator';
import { Roles } from '../../auth/decorators/roles.decorator';


@Controller('comments')
@UseGuards(LocalAuthGuard, LocalRolesGuard)
export class CommentsController {
  constructor(private readonly commentsService: CommentsService) {}

  @AdminAccess()
  @Roles('MODERATOR', 'EDITOR', 'BASIC')
  @Post('create')
  public async createComment(
    @Body() body: CommentDTO
  ) {
    return this.commentsService.createComment(body);
  }

  @AdminAccess()
  @Roles('MODERATOR')
  @Get('edit/:id')
  public async updateComment(
    @Param('id') id: string, 
    @Body() body: CommentUpdateDTO
  ) {
    return this.commentsService.updateComment(body, id);
  }

  @AdminAccess()
  @Roles('MODERATOR')
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
