import { Body, Controller, Get, Param, Post } from '@nestjs/common';
import { PostsService } from '../services/posts.service';
import { PostDTO, PostUpdateDTO } from '../dto/post.dto';

@Controller('posts')
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

  @Get('post/:id')
  public async findOnePost(
    @Param('id') id: string
  ) {
    return this.postsService.findOnePost(id);
  }

  @Get('postslist')
  public async findAllPosts() {
    return this.postsService.findAllPosts();
  }
}
