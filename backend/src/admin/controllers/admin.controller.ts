import { Body, Controller, Delete, Get, Param, Post, Put,
  Request, UseGuards } from '@nestjs/common';
import { ApiBearerAuth, ApiParam, ApiQuery, ApiTags } from '@nestjs/swagger';
import { ApiOkPaginatedResponse, ApiPaginationQuery, Paginate,
  PaginateQuery, Paginated } from 'nestjs-paginate';

import { UsersEntity } from '../../users/entities/users.entity';
import { CategoriesEntity } from '../../categories/entities/categories.entity';
import { PostsEntity } from '../../posts/entities/posts.entity';
import { CommentsEntity } from '../../comments/entities/comments.entity';
import { UserUpdateDTO } from '../../users/dto/user.update.dto';
import { CategoryCreateDTO } from '../../categories/dto/category.create.dto';
import { CategoryUpdateDTO } from '../../categories/dto/category.update.dto';
import { PostUpdateDTO } from '../../posts/dto/post.update.dto';
import { CommentUpdateDTO } from '../../comments/dto/comment.update.dto';
import { AdminService } from '../services/admin.service';
import { LocalAuthGuard } from '../../auth/guards/local-auth.guard';
import { LocalRolesGuard } from '../../auth/guards/local-auth.roles.guard';
import { AdminAccess } from '../../auth/decorators/admin.decorator';
import { SEARCH_USERS_CONFIG } from '../../search/filters/search.users';
import { SEARCH_CATEGORIES_CONFIG } from '../../search/filters/search.categories';
import { SEARCH_POSTS_CONFIG } from '../../search/filters/search.posts';
import { SEARCH_COMMENTS_CONFIG } from '../../search/filters/search.comments';
import { SWAGGER_CATEGORY_BODY_EXAMPLE,
   SWAGGER_ID_EXAMPLE } from '../../constants/swagger.examples';
import { POSTS_DEFAULT_CONFIG } from 'src/posts/filters/posts.default';
import { USERS_DEFAULT_CONFIG } from 'src/users/filters/users.default';
import { CATEGORIES_DEFAULT_CONFIG } from 'src/categories/filters/categories.default';
import { COMMENTS_FILTER_CONFIG } from 'src/comments/filters/comments.filter';


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
    @Body() body: UserUpdateDTO,
    @Request() request: Request
  ) {
    return this.adminService.updateUser(body, id, request);
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

  @ApiOkPaginatedResponse(
    UserUpdateDTO,
    USERS_DEFAULT_CONFIG,
  )
  @ApiPaginationQuery(USERS_DEFAULT_CONFIG)
  @ApiBearerAuth('access_token')
  @AdminAccess()
  @Get('users/list')
  public async findAllUsers(
    @Paginate() query: PaginateQuery
  ): Promise<Paginated<UsersEntity>> {
    return this.adminService.findAllUsers(query);
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

  @ApiOkPaginatedResponse(
    CategoryUpdateDTO,
    CATEGORIES_DEFAULT_CONFIG,
  )
  @ApiPaginationQuery(CATEGORIES_DEFAULT_CONFIG)
  @ApiBearerAuth('access_token')
  @AdminAccess()
  @Get('categories/list')
  public async findAllCategories(
    @Paginate() query: PaginateQuery
  ): Promise<Paginated<CategoriesEntity>> {
    return this.adminService.findAllCategories(query);
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
  @AdminAccess()
  @Get('posts/list2')
  public async findPostsByUser(
    @Param('id') id: string,
    @Paginate() query: PaginateQuery
  ): Promise<Paginated<PostsEntity>> {
    return this.adminService.findPostsByUser(id, query);
  }

  @ApiOkPaginatedResponse(
    PostUpdateDTO,
    POSTS_DEFAULT_CONFIG,
  )
  @ApiPaginationQuery(POSTS_DEFAULT_CONFIG)
  @ApiBearerAuth('access_token')
  @AdminAccess()
  @Get('posts/list')
  public async findAllPosts(
    @Paginate() query: PaginateQuery
  ): Promise<Paginated<PostsEntity>> {
    return this.adminService.findAllPosts(query);
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

  @ApiOkPaginatedResponse(
    CommentUpdateDTO,
    COMMENTS_FILTER_CONFIG,
  )
  @ApiPaginationQuery(COMMENTS_FILTER_CONFIG)
  @ApiBearerAuth('access_token')
  @AdminAccess()
  public async findAllComments(
    @Paginate() query: PaginateQuery
  ): Promise<Paginated<CommentsEntity>> {
    return this.adminService.findAllComments(query);
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
    @Paginate() query: PaginateQuery
  ): Promise<Paginated<CategoriesEntity>> {
    return this.adminService.searchCategories(query);
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
    @Paginate() query: PaginateQuery
  ): Promise<Paginated<PostsEntity>> {
    return this.adminService.searchPosts(query);
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