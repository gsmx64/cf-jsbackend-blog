import { Body, Controller, DefaultValuePipe, Delete, Get, Param, ParseIntPipe,
         Post, Put, Query, Request, UseGuards } from '@nestjs/common';
import { ApiHeader, ApiParam, ApiQuery, ApiTags } from '@nestjs/swagger';
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


@ApiTags('Posts')
@Controller('posts')
@UseGuards(LocalAuthGuard, LocalRolesGuard)
export class PostsController {
  constructor(private readonly postsService: PostsService) {}

  @ApiParam({
    name: 'body',
    type: 'string',
    required: true,
    example: '{ "title": "Test title", "description": "Test description.", "https://url.com/avatar.png", \
      "content": "Testing content.", "status": "PUBLISHED", "author": "f68b3d30-e04a-4a19-b211-b3c809c2ded9", \
      "category": "c1180585-8ab8-4f85-9316-6ab1960abf92", "posts": [], "comments": [] }',
    description: 'The body data to create a post.'
  })
  @ApiHeader({
    name: 'access_token',
    required: true,
    example: 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJyt2xlIjoiQJRNSU4iLCJzdWIiOiJmNjhiM2QzMC1lMDRhLTRhMTktYjIxMS1iM2M4MDljHmRlZDkeLCJpYXQiOjE3MDY1NTg1NTksImV4cCI6MGcwNjU1ODU2Mn0.Udvy-Obf-FpstpTeE5W1F0PynN_RXLDhOeUfdkqgtXU',
    description: 'The user\'s Jwt token.'
  })
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
    example: 'f68b3d30-e04a-4a19-b211-b3c809c2ded9',
    description: 'The post uuid to edit its data.'
  })
  @ApiHeader({
    name: 'access_token',
    required: true,
    example: 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJyt2xlIjoiQJRNSU4iLCJzdWIiOiJmNjhiM2QzMC1lMDRhLTRhMTktYjIxMS1iM2M4MDljHmRlZDkeLCJpYXQiOjE3MDY1NTg1NTksImV4cCI6MGcwNjU1ODU2Mn0.Udvy-Obf-FpstpTeE5W1F0PynN_RXLDhOeUfdkqgtXU',
    description: 'The user\'s Jwt token.'
  })
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
    example: 'f68b3d30-e04a-4a19-b211-b3c809c2ded9',
    description: 'The post uuid to delete its data.'
  })
  @ApiHeader({
    name: 'access_token',
    required: true,
    example: 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJyt2xlIjoiQJRNSU4iLCJzdWIiOiJmNjhiM2QzMC1lMDRhLTRhMTktYjIxMS1iM2M4MDljHmRlZDkeLCJpYXQiOjE3MDY1NTg1NTksImV4cCI6MGcwNjU1ODU2Mn0.Udvy-Obf-FpstpTeE5W1F0PynN_RXLDhOeUfdkqgtXU',
    description: 'The user\'s Jwt token.'
  })
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
    example: 'f68b3d30-e04a-4a19-b211-b3c809c2ded9',
    description: 'The post uuid to search its data.'
  })
  @PublicAccess()
  @Get('view/:id')
  public async findOnePost(
    @Param('id') id: string
  ) {
    return this.postsService.findOnePost(id);
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
  @PublicAccess()
  @Get('list')
  public async findAllPosts(
    @Query('page', new DefaultValuePipe(1), ParseIntPipe) page: number = 1,
    @Query('limit', new DefaultValuePipe(
      process.env.APP_PAGINATION_DEFAULT_LIMIT || 10), ParseIntPipe
    ) limit: number = process.env.APP_PAGINATION_DEFAULT_LIMIT || 10,
    @Request() req: ExpressRequest
  ): Promise<Pagination<PostsEntity>> {
    limit = limit > process.env.APP_PAGINATION_MAX_LIMIT || 100 ? 
      process.env.APP_PAGINATION_MAX_LIMIT || 100 : limit;
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
