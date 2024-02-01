import { Body, Controller, DefaultValuePipe, Delete, Get, Param, ParseIntPipe,
         Post, Put, Query, Request, UseGuards } from '@nestjs/common';
import { ApiBearerAuth, ApiParam, ApiQuery, ApiTags } from '@nestjs/swagger';
import { Pagination } from 'nestjs-typeorm-paginate';
import { Request as ExpressRequest } from 'express';
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
import { paginationRoute } from '../../utils/pagination.route';
import { PostsEntity } from '../entities/posts.entity';
import { POSTS_FILTER_CONFIG } from '../filters/posts.filter';
import { POSTS_SEARCH_CONFIG } from '../filters/posts.search';
import { SWAGGER_ID_EXAMPLE,
  SWAGGER_POST_BODY_EXAMPLE } from '../../constants/swagger.examples';


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
  @ApiQuery({
    name: 'page',
    type: 'integer',
    required: false,
    example: 1,
    description: 'The number of items to skip before starting to collect the result set.'
  })
  @ApiQuery({
    name: 'limit',
    type: 'integer',
    required: false,
    example: 10,
    description: 'The numbers of items to return.'
  })
  @ApiBearerAuth('access_token')
  @PublicAccess()
  @Get('user/:id')
  public async findPostsByUser(
    @Param('id') id: string,
    @Query('page', new DefaultValuePipe(1), ParseIntPipe) page: number = 1,
    @Query('limit', new DefaultValuePipe(
      process.env.APP_PAGINATION_DEFAULT_LIMIT || 10), ParseIntPipe
    ) limit: number = process.env.APP_PAGINATION_DEFAULT_LIMIT || 10,
    @Request() req: ExpressRequest
  ) {
    limit = limit > (process.env.APP_PAGINATION_MAX_LIMIT || 100) ? 
      (process.env.APP_PAGINATION_MAX_LIMIT || 100) : limit;
    return this.postsService.findPostsByUser(
      id,
      {
        page,
        limit,
        route: paginationRoute(req),
      }
    );
  }

  @ApiQuery({
    name: 'page',
    type: 'integer',
    required: false,
    example: 1,
    description: 'The number of items to skip before starting to collect the result set.'
  })
  @ApiQuery({
    name: 'limit',
    type: 'integer',
    required: false,
    example: 10,
    description: 'The numbers of items to return.'
  })
  @ApiBearerAuth('access_token')
  @PublicAccess()
  @Get('list')
  public async findAllPosts(
    @Query('page', new DefaultValuePipe(1), ParseIntPipe) page: number = 1,
    @Query('limit', new DefaultValuePipe(
      process.env.APP_PAGINATION_DEFAULT_LIMIT || 10), ParseIntPipe
    ) limit: number = process.env.APP_PAGINATION_DEFAULT_LIMIT || 10,
    @Request() req: ExpressRequest
  ): Promise<Pagination<PostsEntity>> {
    limit = limit > (process.env.APP_PAGINATION_MAX_LIMIT || 100) ? 
      (process.env.APP_PAGINATION_MAX_LIMIT || 100) : limit;
    return this.postsService.findAllPosts({
      page,
      limit,
      route: paginationRoute(req),
    });
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
    @Paginate() query: PaginateQuery,
    @Request() request: Request
  ): Promise<Paginated<PostsEntity>> {
    return this.postsService.searchPosts(query, request);
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
    @Paginate() query: PaginateQuery,
    @Request() request: Request
  ): Promise<Paginated<PostsEntity>> {
    return this.postsService.filterPosts(query, request);
  }
}
