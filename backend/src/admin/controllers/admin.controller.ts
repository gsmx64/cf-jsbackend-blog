import { Body, Controller, DefaultValuePipe, Delete, Get, Param, ParseIntPipe, Post, Put, Query, Request, UseGuards } from '@nestjs/common';
import { ApiHeader, ApiParam, ApiQuery, ApiTags } from '@nestjs/swagger';
import { Pagination } from 'nestjs-typeorm-paginate';
import { Request as ExpressRequest } from 'express'

import { AdminService } from '../services/admin.service';
import { LocalAuthGuard } from '../../auth/guards/local-auth.guard';
import { LocalRolesGuard } from '../../auth/guards/local-auth.roles.guard';
import { UserUpdateDTO } from '../../users/dto/user.update.dto';
import { PostUpdateDTO } from '../../posts/dto/post.update.dto';
import { AdminAccess } from '../../auth/decorators/admin.decorator';
import { CategoryUpdateDTO } from '../../categories/dto/category.update.dto';
import { UsersEntity } from '../../users/entities/users.entity';
import { paginationRoute } from '../../utils/pagination.route';
import { PostsEntity } from 'src/posts/entities/posts.entity';
import { CategoriesEntity } from 'src/categories/entities/categories.entity';
import { CategoryCreateDTO } from 'src/categories/dto/category.create.dto';
import { ApiOkPaginatedResponse, ApiPaginationQuery, Paginate, PaginateQuery, Paginated } from 'nestjs-paginate';
import { CommentsEntity } from 'src/comments/entities/comments.entity';


@ApiTags('Admin')
@Controller('admin')
@UseGuards(LocalAuthGuard, LocalRolesGuard)
export class AdminController {
  constructor(private readonly adminService: AdminService) {}

  @ApiParam({
    name: 'id',
    type: 'string',
    required: false,
    example: 'f68b3d30-e04a-4a19-b211-b3c809c2ded9',
    description: 'The user uuid to edit their data.'
  })
  @ApiHeader({
    name: 'access_token',
    required: true,
    example: 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJyt2xlIjoiQJRNSU4iLCJzdWIiOiJmNjhiM2QzMC1lMDRhLTRhMTktYjIxMS1iM2M4MDljHmRlZDkeLCJpYXQiOjE3MDY1NTg1NTksImV4cCI6MGcwNjU1ODU2Mn0.Udvy-Obf-FpstpTeE5W1F0PynN_RXLDhOeUfdkqgtXU',
    description: 'The user\'s Jwt token.'
  })
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
    required: false,
    example: 'f68b3d30-e04a-4a19-b211-b3c809c2ded9',
    description: 'The user uuid to delete their data.'
  })
  @ApiHeader({
    name: 'access_token',
    required: true,
    example: 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJyt2xlIjoiQJRNSU4iLCJzdWIiOiJmNjhiM2QzMC1lMDRhLTRhMTktYjIxMS1iM2M4MDljHmRlZDkeLCJpYXQiOjE3MDY1NTg1NTksImV4cCI6MGcwNjU1ODU2Mn0.Udvy-Obf-FpstpTeE5W1F0PynN_RXLDhOeUfdkqgtXU',
    description: 'The user\'s Jwt token.'
  })
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
    example: 'f68b3d30-e04a-4a19-b211-b3c809c2ded9',
    description: 'The user uuid to search their data.'
  })
  @ApiHeader({
    name: 'access_token',
    required: true,
    example: 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJyt2xlIjoiQJRNSU4iLCJzdWIiOiJmNjhiM2QzMC1lMDRhLTRhMTktYjIxMS1iM2M4MDljHmRlZDkeLCJpYXQiOjE3MDY1NTg1NTksImV4cCI6MGcwNjU1ODU2Mn0.Udvy-Obf-FpstpTeE5W1F0PynN_RXLDhOeUfdkqgtXU',
    description: 'The user\'s Jwt token.'
  })
  @AdminAccess()
  @Get('users/view/:id')
  public async findOneUser(
    @Param('id') id: string
  ) {
    return this.adminService.findOneUser(id);
  }

  @ApiHeader({
    name: 'access_token',
    required: true,
    example: 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJyt2xlIjoiQJRNSU4iLCJzdWIiOiJmNjhiM2QzMC1lMDRhLTRhMTktYjIxMS1iM2M4MDljHmRlZDkeLCJpYXQiOjE3MDY1NTg1NTksImV4cCI6MGcwNjU1ODU2Mn0.Udvy-Obf-FpstpTeE5W1F0PynN_RXLDhOeUfdkqgtXU',
    description: 'The user\'s Jwt token.'
  })
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
  @ApiHeader({
    name: 'access_token',
    required: true,
    example: 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJyt2xlIjoiQJRNSU4iLCJzdWIiOiJmNjhiM2QzMC1lMDRhLTRhMTktYjIxMS1iM2M4MDljHmRlZDkeLCJpYXQiOjE3MDY1NTg1NTksImV4cCI6MGcwNjU1ODU2Mn0.Udvy-Obf-FpstpTeE5W1F0PynN_RXLDhOeUfdkqgtXU',
    description: 'The user\'s Jwt token.'
  })
  @AdminAccess()
  @Get('users/list')
  public async findAllUsers(
    @Query('page', new DefaultValuePipe(1), ParseIntPipe) page: number = 1,
    @Query('limit', new DefaultValuePipe(10), ParseIntPipe) limit: number = 10,
    @Request() req: ExpressRequest
  ): Promise<Pagination<UsersEntity>> {
    limit = limit > 100 ? 100 : limit;
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
    example: '{ "title": "Default Category", "description": "Default Category description.", \
    "image": "https://url.com/avatar.png", "author": "f68b3d30-e04a-4a19-b211-b3c809c2ded9", \
    "status": "PUBLISHED", "posts": [] }',
    description: 'The body data to create a category.'
  })
  @ApiHeader({
    name: 'access_token',
    required: true,
    example: 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJyt2xlIjoiQJRNSU4iLCJzdWIiOiJmNjhiM2QzMC1lMDRhLTRhMTktYjIxMS1iM2M4MDljHmRlZDkeLCJpYXQiOjE3MDY1NTg1NTksImV4cCI6MGcwNjU1ODU2Mn0.Udvy-Obf-FpstpTeE5W1F0PynN_RXLDhOeUfdkqgtXU',
    description: 'The user\'s Jwt token.'
  })
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
    example: 'f68b3d30-e04a-4a19-b211-b3c809c2ded9',
    description: 'The category uuid to edit its data.'
  })
  @ApiHeader({
    name: 'access_token',
    required: true,
    example: 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJyt2xlIjoiQJRNSU4iLCJzdWIiOiJmNjhiM2QzMC1lMDRhLTRhMTktYjIxMS1iM2M4MDljHmRlZDkeLCJpYXQiOjE3MDY1NTg1NTksImV4cCI6MGcwNjU1ODU2Mn0.Udvy-Obf-FpstpTeE5W1F0PynN_RXLDhOeUfdkqgtXU',
    description: 'The user\'s Jwt token.'
  })
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
    example: 'f68b3d30-e04a-4a19-b211-b3c809c2ded9',
    description: 'The category uuid to delete its data.'
  })
  @ApiHeader({
    name: 'access_token',
    required: true,
    example: 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJyt2xlIjoiQJRNSU4iLCJzdWIiOiJmNjhiM2QzMC1lMDRhLTRhMTktYjIxMS1iM2M4MDljHmRlZDkeLCJpYXQiOjE3MDY1NTg1NTksImV4cCI6MGcwNjU1ODU2Mn0.Udvy-Obf-FpstpTeE5W1F0PynN_RXLDhOeUfdkqgtXU',
    description: 'The user\'s Jwt token.'
  })
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
    example: 'f68b3d30-e04a-4a19-b211-b3c809c2ded9',
    description: 'The category uuid to search its data.'
  })
  @ApiHeader({
    name: 'access_token',
    required: true,
    example: 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJyt2xlIjoiQJRNSU4iLCJzdWIiOiJmNjhiM2QzMC1lMDRhLTRhMTktYjIxMS1iM2M4MDljHmRlZDkeLCJpYXQiOjE3MDY1NTg1NTksImV4cCI6MGcwNjU1ODU2Mn0.Udvy-Obf-FpstpTeE5W1F0PynN_RXLDhOeUfdkqgtXU',
    description: 'The user\'s Jwt token.'
  })
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
  @ApiHeader({
    name: 'access_token',
    required: true,
    example: 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJyt2xlIjoiQJRNSU4iLCJzdWIiOiJmNjhiM2QzMC1lMDRhLTRhMTktYjIxMS1iM2M4MDljHmRlZDkeLCJpYXQiOjE3MDY1NTg1NTksImV4cCI6MGcwNjU1ODU2Mn0.Udvy-Obf-FpstpTeE5W1F0PynN_RXLDhOeUfdkqgtXU',
    description: 'The user\'s Jwt token.'
  })
  @AdminAccess()
  @Get('categories/list')
  public async findAllCategories(
    @Query('page', new DefaultValuePipe(1), ParseIntPipe) page: number = 1,
    @Query('limit', new DefaultValuePipe(10), ParseIntPipe) limit: number = 10,
    @Request() req: ExpressRequest
  ): Promise<Pagination<CategoriesEntity>> {
    limit = limit > 100 ? 100 : limit;
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
    example: 'f68b3d30-e04a-4a19-b211-b3c809c2ded9',
    description: 'The post uuid to search its data.'
  })
  @ApiHeader({
    name: 'access_token',
    required: true,
    example: 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJyt2xlIjoiQJRNSU4iLCJzdWIiOiJmNjhiM2QzMC1lMDRhLTRhMTktYjIxMS1iM2M4MDljHmRlZDkeLCJpYXQiOjE3MDY1NTg1NTksImV4cCI6MGcwNjU1ODU2Mn0.Udvy-Obf-FpstpTeE5W1F0PynN_RXLDhOeUfdkqgtXU',
    description: 'The user\'s Jwt token.'
  })
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
  @ApiHeader({
    name: 'access_token',
    required: true,
    example: 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJyt2xlIjoiQJRNSU4iLCJzdWIiOiJmNjhiM2QzMC1lMDRhLTRhMTktYjIxMS1iM2M4MDljHmRlZDkeLCJpYXQiOjE3MDY1NTg1NTksImV4cCI6MGcwNjU1ODU2Mn0.Udvy-Obf-FpstpTeE5W1F0PynN_RXLDhOeUfdkqgtXU',
    description: 'The user\'s Jwt token.'
  })
  @AdminAccess()
  @Get('posts/list')
  public async findAllPosts(
    @Query('page', new DefaultValuePipe(1), ParseIntPipe) page: number = 1,
    @Query('limit', new DefaultValuePipe(10), ParseIntPipe) limit: number = 10,
    @Request() req: ExpressRequest
  ): Promise<Pagination<PostsEntity>> {
    limit = limit > 100 ? 100 : limit;
    return this.adminService.findAllPosts({
      page,
      limit,
      route: paginationRoute(req),
    });
  }
}
