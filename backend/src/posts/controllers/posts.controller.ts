import { Body, Controller, Get, Param, Post, UseGuards } from '@nestjs/common';

import { PostsService } from '../services/posts.service';
import { PostDTO } from '../dto/post.dto';
import { PostUpdateDTO } from '../dto/post.update.dto';
import { LocalAuthGuard } from '../../auth/guards/local-auth.guard';
import { LocalRolesGuard } from '../../auth/guards/local-auth.roles.guard';
import { AdminAccess } from '../../auth/decorators/admin.decorator';
import { PublicAccess } from '../../auth/decorators/public.decorator';
import { Roles } from '../../auth/decorators/roles.decorator';


@Controller('posts')
@UseGuards(LocalAuthGuard, LocalRolesGuard)
export class PostsController {
  constructor(private readonly postsService: PostsService) {}

  @AdminAccess()
  @Roles('MODERATOR', 'EDITOR')
  @Post('create')
  public async createPost(
    @Body() body: PostDTO
  ) {
    return this.postsService.createPost(body);
  }

  @AdminAccess()
  @Roles('MODERATOR', 'EDITOR')
  @Get('edit/:id')
  public async updatePost(
    @Param('id') id: string, 
    @Body() body: PostUpdateDTO
  ) {
    return this.postsService.updatePost(body, id);
  }

  @AdminAccess()
  @Roles('MODERATOR')
  @Get('delete/:id')
  public async deletePost(
    @Param('id') id: string
  ) {
    return this.postsService.deletePost(id);
  }

  @PublicAccess()
  @Get('view/:id')
  public async findOnePost(
    @Param('id') id: string
  ) {
    return this.postsService.findOnePost(id);
  }

  @PublicAccess()
  @Get('list')
  public async findAllPosts() {
    return this.postsService.findAllPosts();
  }
}
