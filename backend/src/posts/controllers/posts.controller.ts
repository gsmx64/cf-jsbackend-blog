import { Body, Controller, Get, Param, Post, UseGuards } from '@nestjs/common';
import { PostsService } from '../services/posts.service';
import { PostDTO, PostUpdateDTO } from '../dto/post.dto';
import { LocalAuthGuard } from 'src/auth/guards/local-auth.guard';
import { PublicAccess } from 'src/auth/decorators/public.decorator';

@Controller('posts')
@UseGuards(LocalAuthGuard)
export class PostsController {
  constructor(private readonly postsService: PostsService) {}

  @Post('create')
  public async createPost(
    @Body() body: PostDTO
  ) {
    return this.postsService.createPost(body);
  }

  @Get('edit/:id')
  public async updatePost(
    @Param('id') id: string, 
    @Body() body: PostUpdateDTO
  ) {
    return this.postsService.updatePost(body, id);
  }

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
