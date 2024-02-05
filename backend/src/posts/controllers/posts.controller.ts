import { Body, Controller, Delete, Get, Param,
         Post, Put, UseGuards } from '@nestjs/common';
import { ApiBearerAuth, ApiParam, ApiQuery, ApiTags } from '@nestjs/swagger';
import { ApiOkPaginatedResponse, ApiPaginationQuery, Paginate,
  PaginateQuery, Paginated } from 'nestjs-paginate';

import { PostsService } from '../services/posts.service';
import { PostCreateDTO } from '../dto/post.create.dto';
import { PostUpdateDTO } from '../dto/post.update.dto';
import { LocalAuthGuard } from '../../auth/guards/local-auth.guard';
import { LocalRolesGuard } from '../../auth/guards/local-auth.roles.guard';
import { AdminAccess } from '../../auth/decorators/admin.decorator';
import { PublicAccess } from '../../auth/decorators/public.decorator';
import { Roles } from '../../auth/decorators/roles.decorator';
import { PostsEntity } from '../entities/posts.entity';
import { POSTS_FILTER_CONFIG } from '../filters/posts.filter';
import { POSTS_SEARCH_CONFIG } from '../filters/posts.search';
import { SWAGGER_ID_EXAMPLE,
  SWAGGER_POST_BODY_EXAMPLE } from '../../constants/swagger.examples';
import { POSTS_DEFAULT_CONFIG } from '../filters/posts.default';


@ApiTags('Posts')
@Controller('posts')
@UseGuards(LocalAuthGuard, LocalRolesGuard)
export class PostsController {
  constructor(private readonly postsService: PostsService) {}

  @ApiParam({
    name: 'body',
    type: 'string',
    required: true,
    example: SWAGGER_POST_BODY_EXAMPLE,
    description: 'The body data to create a post.'
  })
  @ApiBearerAuth('access_token')
  @AdminAccess()
  @Roles('MODERATOR', 'EDITOR')
  @Post('create')
  public async createPost(
    @Body() body: PostCreateDTO
  ) {
    return this.postsService.createPost(body);
  }

  @ApiParam({
    name: 'id',
    type: 'string',
    required: true,
    example: SWAGGER_ID_EXAMPLE,
    description: 'The post uuid to edit its data.'
  })
  @ApiBearerAuth('access_token')
  @AdminAccess()
  @Roles('MODERATOR', 'EDITOR')
  @Put('edit/:id')
  public async updatePost(
    @Param('id') id: string, 
    @Body() body: PostUpdateDTO
  ) {
    return this.postsService.updatePost(body, id);
  }

  @ApiParam({
    name: 'id',
    type: 'string',
    required: true,
    example: SWAGGER_ID_EXAMPLE,
    description: 'The post uuid to delete its data.'
  })
  @ApiBearerAuth('access_token')
  @AdminAccess()
  @Roles('MODERATOR')
  @Delete('delete/:id')
  public async deletePost(
    @Param('id') id: string
  ) {
    return this.postsService.deletePost(id);
  }

  @ApiParam({
    name: 'id',
    type: 'string',
    required: true,
    example: SWAGGER_ID_EXAMPLE,
    description: 'The post uuid to search its data.'
  })
  @ApiBearerAuth('access_token')
  @PublicAccess()
  @Get('view/:id')
  public async findOnePost(
    @Param('id') id: string
  ) {
    return this.postsService.findOnePost(id);
  }

  @ApiParam({
    name: 'id',
    type: 'string',
    required: true,
    example: SWAGGER_ID_EXAMPLE,
    description: 'The user uuid to search his/her posts.'
  })
  @ApiOkPaginatedResponse(
    PostUpdateDTO,
    POSTS_DEFAULT_CONFIG,
  )
  @ApiPaginationQuery(POSTS_DEFAULT_CONFIG)
  @ApiBearerAuth('access_token')
  @PublicAccess()
  @Get('user/:id')
  public async findPostsByUser(
    @Param('id') id: string,
    @Paginate() query: PaginateQuery
  ): Promise<Paginated<PostsEntity>> {
    return this.postsService.findPostsByUser(id, query);
  }

  @ApiOkPaginatedResponse(
    PostUpdateDTO,
    POSTS_DEFAULT_CONFIG,
  )
  @ApiPaginationQuery(POSTS_DEFAULT_CONFIG)
  @ApiBearerAuth('access_token')
  @PublicAccess()
  @Get('list')
  public async findAllPosts(
    @Paginate() query: PaginateQuery
  ): Promise<Paginated<PostsEntity>> {
    return this.postsService.findAllPosts(query);
  }

  @ApiOkPaginatedResponse(
    PostUpdateDTO,
    POSTS_SEARCH_CONFIG,
  )
  @ApiPaginationQuery(POSTS_SEARCH_CONFIG)
  @ApiBearerAuth('access_token')
  @AdminAccess()
  @Roles('MODERATOR', 'EDITOR', 'BASIC')
  @Get('search')
  public async searchPosts(
    @Paginate() query: PaginateQuery
  ): Promise<Paginated<PostsEntity>> {
    return this.postsService.searchPosts(query);
  }

  @ApiOkPaginatedResponse(
    PostUpdateDTO,
    POSTS_FILTER_CONFIG,
  )
  @ApiPaginationQuery(POSTS_FILTER_CONFIG)
  @ApiBearerAuth('access_token')
  @AdminAccess()
  @Roles('MODERATOR', 'EDITOR', 'BASIC')
  @Get('filter')
  public async filterPosts(
    @Paginate() query: PaginateQuery
  ): Promise<Paginated<PostsEntity>> {
    return this.postsService.filterPosts(query);
  }
}
