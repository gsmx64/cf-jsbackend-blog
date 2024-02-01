import { Body, Controller, DefaultValuePipe, Delete, Get, Param, ParseIntPipe, Post, Put, Query, Request, UseGuards } from '@nestjs/common';
import { ApiBearerAuth, ApiParam, ApiQuery, ApiTags } from '@nestjs/swagger';
import { Pagination } from 'nestjs-typeorm-paginate';
import { Request as ExpressRequest } from 'express'
import { ApiOkPaginatedResponse, ApiPaginationQuery, Paginate, PaginateQuery, Paginated } from 'nestjs-paginate';

import { UsersEntity } from '../../users/entities/users.entity';
import { CategoriesEntity } from '../../categories/entities/categories.entity';
import { PostsEntity } from '../../posts/entities/posts.entity';
import { CommentsEntity } from '../../comments/entities/comments.entity';
import { UserUpdateDTO } from '../../users/dto/user.update.dto';
import { CategoryCreateDTO } from 'src/categories/dto/category.create.dto';
import { CategoryUpdateDTO } from '../../categories/dto/category.update.dto';
import { PostUpdateDTO } from '../../posts/dto/post.update.dto';
import { CommentUpdateDTO } from '../../comments/dto/comment.update.dto';
import { AdminService } from '../services/admin.service';
import { LocalAuthGuard } from '../../auth/guards/local-auth.guard';
import { LocalRolesGuard } from '../../auth/guards/local-auth.roles.guard';
import { AdminAccess } from '../../auth/decorators/admin.decorator';
import { paginationRoute } from '../../utils/pagination.route';
import { SEARCH_USERS_CONFIG } from '../../search/filters/search.users';
import { SEARCH_CATEGORIES_CONFIG } from '../../search/filters/search.categories';
import { SEARCH_POSTS_CONFIG } from '../../search/filters/search.posts';
import { SEARCH_COMMENTS_CONFIG } from '../../search/filters/search.comments';
import { SWAGGER_CATEGORY_BODY_EXAMPLE,
   SWAGGER_ID_EXAMPLE } from '../../constants/swagger.examples';


@ApiTags('Admin')
@Controller('admin')
@UseGuards(LocalAuthGuard, LocalRolesGuard)
export class AdminController {
  constructor(private readonly adminService: AdminService) {}

  @ApiParam({
    name: 'id',
    type: 'string',
    required: true,
    example: SWAGGER_ID_EXAMPLE,
    description: 'The user uuid to edit their data.'
  })
  @ApiBearerAuth('access_token')
  @AdminAccess()
  @Put('users/edit/:id')
  public async updateUser(
    @Param('id') id: string, 
    @Body() body: UserUpdateDTO
  ) {
    return this.adminService.updateUser(body, id);
  }

  @ApiParam({
    name: 'id',
    type: 'string',
    required: true,
    example: SWAGGER_ID_EXAMPLE,
    description: 'The user uuid to delete their data.'
  })
  @ApiBearerAuth('access_token')
  @AdminAccess()
  @Delete('users/delete/:id')
  public async deleteUser(
    @Param('id') id: string
  ) {
    return this.adminService.deleteUser(id);
  }

  @ApiParam({
    name: 'id',
    type: 'string',
    required: true,
    example: SWAGGER_ID_EXAMPLE,
    description: 'The user uuid to search their data.'
  })
  @ApiBearerAuth('access_token')
  @AdminAccess()
  @Get('users/view/:id')
  public async findOneUser(
    @Param('id') id: string
  ) {
    return this.adminService.findOneUser(id);
  }

  @ApiBearerAuth('access_token')
  @AdminAccess()
  @Get('users/profile')
  public async findOwnProfile(@Request() request: Request) {
    return this.adminService.findOwnProfile(request);
  }

  @ApiQuery({
    name: 'page',
    type: 'integer',
    required: true,
    example: 1,
    description: 'The number of items to skip before starting to collect the result set.'
  })
  @ApiQuery({
    name: 'limit',
    type: 'integer',
    required: true,
    example: 10,
    description: 'The numbers of items to return.'
  })
  @ApiBearerAuth('access_token')
  @AdminAccess()
  @Get('users/list')
  public async findAllUsers(
    @Query('page', new DefaultValuePipe(1), ParseIntPipe) page: number = 1,
    @Query('limit', new DefaultValuePipe(
      process.env.APP_PAGINATION_DEFAULT_LIMIT || 10), ParseIntPipe
    ) limit: number = process.env.APP_PAGINATION_DEFAULT_LIMIT || 10,
    @Request() req: ExpressRequest
  ): Promise<Pagination<UsersEntity>> {
    limit = limit > process.env.APP_PAGINATION_MAX_LIMIT || 100 ? 
      process.env.APP_PAGINATION_MAX_LIMIT || 100 : limit;
    return this.adminService.findAllUsers({
      page,
      limit,
      route: paginationRoute(req),
    });
  }

  @ApiParam({
    name: 'body',
    type: 'string',
    required: true,
    example: SWAGGER_CATEGORY_BODY_EXAMPLE,
    description: 'The body data to create a category.'
  })
  @ApiBearerAuth('access_token')
  @AdminAccess()
  @Post('categories/create')
  public async createCategory(
    @Body() body: CategoryCreateDTO
  ) {
    return this.adminService.createCategory(body);
  }

  @ApiParam({
    name: 'id',
    type: 'string',
    required: true,
    example: SWAGGER_ID_EXAMPLE,
    description: 'The category uuid to edit its data.'
  })
  @ApiBearerAuth('access_token')
  @AdminAccess()
  @Put('categories/edit/:id')
  public async updateCategory(
    @Param('id') id: string, 
    @Body() body: CategoryUpdateDTO
  ) {
    return this.adminService.updateCategory(body, id);
  }

  @ApiParam({
    name: 'id',
    type: 'string',
    required: true,
    example: SWAGGER_ID_EXAMPLE,
    description: 'The category uuid to delete its data.'
  })
  @ApiBearerAuth('access_token')
  @AdminAccess()
  @Delete('categories/delete/:id')
  public async deleteCategory(
    @Param('id') id: string
  ) {
    return this.adminService.deleteCategory(id);
  }

  @ApiParam({
    name: 'id',
    type: 'string',
    required: true,
    example: SWAGGER_ID_EXAMPLE,
    description: 'The category uuid to search its data.'
  })
  @ApiBearerAuth('access_token')
  @AdminAccess()
  @Get('categories/view/:id')
  public async findOneCategory(
    @Param('id') id: string
  ) {
    return this.adminService.findOneCategory(id);
  }

  @ApiQuery({
    name: 'page',
    type: 'integer',
    required: true,
    example: 1,
    description: 'The number of items to skip before starting to collect the result set.'
  })
  @ApiQuery({
    name: 'limit',
    type: 'integer',
    required: true,
    example: 10,
    description: 'The numbers of items to return.'
  })
  @ApiBearerAuth('access_token')
  @AdminAccess()
  @Get('categories/list')
  public async findAllCategories(
    @Query('page', new DefaultValuePipe(1), ParseIntPipe) page: number = 1,
    @Query('limit', new DefaultValuePipe(
      process.env.APP_PAGINATION_DEFAULT_LIMIT || 10), ParseIntPipe
    ) limit: number = process.env.APP_PAGINATION_DEFAULT_LIMIT || 10,
    @Request() req: ExpressRequest
  ): Promise<Pagination<CategoriesEntity>> {
    limit = limit > process.env.APP_PAGINATION_MAX_LIMIT || 100 ? 
      process.env.APP_PAGINATION_MAX_LIMIT || 100 : limit;
    return this.adminService.findAllCategories({
      page,
      limit,
      route: paginationRoute(req),
    });
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
  @Put('posts/edit/:id')
  public async updatePost(
    @Param('id') id: string, 
    @Body() body: PostUpdateDTO
  ) {
    return this.adminService.updatePost(body, id);
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
  @Delete('posts/delete/:id')
  public async deletePost(
    @Param('id') id: string
  ) {
    return this.adminService.deletePost(id);
  }

  @ApiParam({
    name: 'id',
    type: 'string',
    required: true,
    example: SWAGGER_ID_EXAMPLE,
    description: 'The post uuid to search its data.'
  })
  @ApiBearerAuth('access_token')
  @AdminAccess()
  @Get('posts/view/:id')
  public async findOnePost(
    @Param('id') id: string
  ) {
    return this.adminService.findOnePost(id);
  }

  @ApiQuery({
    name: 'page',
    type: 'integer',
    required: true,
    example: 1,
    description: 'The number of items to skip before starting to collect the result set.'
  })
  @ApiQuery({
    name: 'limit',
    type: 'integer',
    required: true,
    example: 10,
    description: 'The numbers of items to return.'
  })
  @ApiBearerAuth('access_token')
  @AdminAccess()
  @Get('posts/list')
  public async findAllPosts(
    @Query('page', new DefaultValuePipe(1), ParseIntPipe) page: number = 1,
    @Query('limit', new DefaultValuePipe(
      process.env.APP_PAGINATION_DEFAULT_LIMIT || 10), ParseIntPipe
    ) limit: number = process.env.APP_PAGINATION_DEFAULT_LIMIT || 10,
    @Request() req: ExpressRequest
  ): Promise<Pagination<PostsEntity>> {
    limit = limit > process.env.APP_PAGINATION_MAX_LIMIT || 100 ? 
      process.env.APP_PAGINATION_MAX_LIMIT || 100 : limit;
    return this.adminService.findAllPosts({
      page,
      limit,
      route: paginationRoute(req),
    });
  }

  @ApiParam({
    name: 'id',
    type: 'string',
    required: true,
    example: SWAGGER_ID_EXAMPLE,
    description: 'The comment uuid to edit its data.'
  })
  @ApiBearerAuth('access_token')
  @AdminAccess()
  @Put('comments/edit/:id')
  public async updateComment(
    @Param('id') id: string, 
    @Body() body: CommentUpdateDTO
  ) {
    return this.adminService.updateComment(body, id);
  }

  @ApiParam({
    name: 'id',
    type: 'string',
    required: true,
    example: SWAGGER_ID_EXAMPLE,
    description: 'The comment uuid to delete its data.'
  })
  @ApiBearerAuth('access_token')
  @AdminAccess()
  @Delete('comments/delete/:id')
  public async deleteComment(
    @Param('id') id: string
  ) {
    return this.adminService.deleteComment(id);
  }

  @ApiParam({
    name: 'id',
    type: 'string',
    required: true,
    example: SWAGGER_ID_EXAMPLE,
    description: 'The comment uuid to search its data.'
  })
  @ApiBearerAuth('access_token')
  @AdminAccess()
  @Get('comments/view/:id')
  public async findOneComment(
    @Param('id') id: string
  ) {
    return this.adminService.findOneComment(id);
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
  @AdminAccess()
  public async findAllComments(
    @Query('page', new DefaultValuePipe(1), ParseIntPipe) page: number = 1,
    @Query('limit', new DefaultValuePipe(
      process.env.APP_PAGINATION_DEFAULT_LIMIT || 10), ParseIntPipe
    ) limit: number = process.env.APP_PAGINATION_DEFAULT_LIMIT || 10,
    @Request() req: ExpressRequest
  ): Promise<Pagination<CommentsEntity>> {
    limit = limit > process.env.APP_PAGINATION_MAX_LIMIT || 100 ? 
      process.env.APP_PAGINATION_MAX_LIMIT || 100 : limit;
    return this.adminService.findAllComments({
      page,
      limit,
      route: paginationRoute(req),
    });
  }

  @ApiOkPaginatedResponse(
    UserUpdateDTO,
    SEARCH_USERS_CONFIG,
  )
  @ApiPaginationQuery(SEARCH_USERS_CONFIG)
  @ApiBearerAuth('access_token')
  @AdminAccess()
  @Get('search/users')
  public async searchUsers(
    @Paginate() query: PaginateQuery
  ): Promise<Paginated<UsersEntity>> {
    return this.adminService.searchUsers(query);
  }

  @ApiOkPaginatedResponse(
    CategoryUpdateDTO,
    SEARCH_CATEGORIES_CONFIG,
  )
  @ApiPaginationQuery(SEARCH_CATEGORIES_CONFIG)
  @ApiBearerAuth('access_token')
  @AdminAccess()
  @Get('search/categories')
  public async searchCategories(
    @Paginate() query: PaginateQuery,
    @Request() request: Request
  ): Promise<Paginated<CategoriesEntity>> {
    return this.adminService.searchCategories(query, request);
  }

  @ApiOkPaginatedResponse(
    PostUpdateDTO,
    SEARCH_POSTS_CONFIG,
  )
  @ApiPaginationQuery(SEARCH_POSTS_CONFIG)
  @ApiBearerAuth('access_token')
  @AdminAccess()
  @Get('search/posts')
  public async searchPosts(
    @Paginate() query: PaginateQuery,
    @Request() request: Request
  ): Promise<Paginated<PostsEntity>> {
    return this.adminService.searchPosts(query, request);
  }

  @ApiOkPaginatedResponse(
    CommentUpdateDTO,
    SEARCH_COMMENTS_CONFIG,
  )
  @ApiPaginationQuery(SEARCH_COMMENTS_CONFIG)
  @ApiBearerAuth('access_token')
  @AdminAccess()
  @Get('search/comments')
  public async searchComments(
    @Paginate() query: PaginateQuery
  ): Promise<Paginated<CommentsEntity>> {
    return this.adminService.searchComments(query);
  }
}
