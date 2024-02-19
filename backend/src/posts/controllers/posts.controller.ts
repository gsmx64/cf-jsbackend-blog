/**
 * Controller responsible for handling the posts related API endpoints.
 */
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


/**
 * Controller responsible for handling posts operations.
 */
@ApiTags('Posts')
@Controller('posts')
@UseGuards(LocalAuthGuard, LocalRolesGuard)
export class PostsController {
  constructor(private readonly postsService: PostsService) {}

  /**
   * Creates a new post.
   * @param body - The data for creating the post.
   * @returns The created post.
   */
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

  /**
   * Updates a post with the specified ID.
   * @param id - The ID of the post to update.
   * @param body - The updated post data.
   * @returns The updated post.
   */
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

  /**
   * Deletes a post by its ID.
   * @param id - The ID of the post to delete.
   * @returns The result of the delete operation.
   */
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

  /**
   * Retrieves a single post by its ID.
   * @param id - The ID of the post to retrieve.
   * @returns The post.
   */
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

  /**
   * Finds all posts by a user.
   * @param id - The ID of the user.
   * @param query - The pagination query.
   * @returns The paginated list of posts.
   */
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

  /**
   * Finds posts by user.
   * @param id - The user ID.
   * @param query - The pagination query.
   * @returns A paginated list of posts.
   */
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

  /**
   * Searches for posts based on the provided query parameters.
   * @param query The pagination query parameters.
   * @returns A promise that resolves to a paginated list of posts.
   */
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

  /**
   * Filters for posts based on the provided query parameters.
   * @param query The pagination query parameters.
   * @returns A promise that resolves to a paginated list of posts.
   */
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
