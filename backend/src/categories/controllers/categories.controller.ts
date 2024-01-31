import { Body, Controller, DefaultValuePipe, Delete, Get, Param, ParseIntPipe,
          Post, Put, Query, Request, UseGuards } from '@nestjs/common';
import { ApiHeader, ApiParam, ApiQuery, ApiTags } from '@nestjs/swagger';
import { Pagination } from 'nestjs-typeorm-paginate';
import { Request as ExpressRequest } from 'express';
import { ApiOkPaginatedResponse, ApiPaginationQuery, Paginate,
  PaginateQuery, Paginated } from 'nestjs-paginate';

import { CategoriesService } from '../services/categories.service';
import { CategoryCreateDTO } from '../dto/category.create.dto';
import { CategoryUpdateDTO } from '../dto/category.update.dto';
import { LocalAuthGuard } from '../../auth/guards/local-auth.guard';
import { LocalRolesGuard } from '../../auth/guards/local-auth.roles.guard';
import { AdminAccess } from '../../auth/decorators/admin.decorator';
import { PublicAccess } from '../../auth/decorators/public.decorator';
import { Roles } from '../../auth/decorators/roles.decorator';
import { paginationRoute } from '../../utils/pagination.route';
import { CategoriesEntity } from '../entities/categories.entity';
import { CATEGORIES_SEARCH_CONFIG } from '../filters/categories.search';
import { CATEGORIES_FILTER_CONFIG } from '../filters/categories.filter';


@ApiTags('Categories')
@Controller('categories')
@UseGuards(LocalAuthGuard, LocalRolesGuard)
export class CategoriesController {
  constructor(private readonly categoriesService: CategoriesService) {}

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
  @Roles('MODERATOR')
  @Post('create')
  public async createCategory(
    @Body() body: CategoryCreateDTO
  ) {
    return this.categoriesService.createCategory(body);
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
  @Roles('MODERATOR')
  @Put('edit/:id')
  public async updateCategory(
    @Param('id') id: string, 
    @Body() body: CategoryUpdateDTO
  ) {
    return this.categoriesService.updateCategory(body, id);
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
  @Delete('delete/:id')
  public async deleteCategory(
    @Param('id') id: string
  ) {
    return this.categoriesService.deleteCategory(id);
  }

  @ApiParam({
    name: 'id',
    type: 'string',
    required: true,
    example: 'f68b3d30-e04a-4a19-b211-b3c809c2ded9',
    description: 'The category uuid to search its data.'
  })
  @PublicAccess()
  @Get('view/:id')
  public async findOneCategory(
    @Param('id') id: string
  ) {
    return this.categoriesService.findOneCategory(id);
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
  public async findAllCategories(
    @Query('page', new DefaultValuePipe(1), ParseIntPipe) page: number = 1,
    @Query('limit', new DefaultValuePipe(
      process.env.APP_PAGINATION_DEFAULT_LIMIT || 10), ParseIntPipe
    ) limit: number = process.env.APP_PAGINATION_DEFAULT_LIMIT || 10,
    @Request() req: ExpressRequest
  ): Promise<Pagination<CategoriesEntity>> {
    limit = limit > process.env.APP_PAGINATION_MAX_LIMIT || 100 ? 
      process.env.APP_PAGINATION_MAX_LIMIT || 100 : limit;
    return this.categoriesService.findAllCategories({
      page,
      limit,
      route: paginationRoute(req),
    });
  }

  @ApiOkPaginatedResponse(
    CategoryUpdateDTO,
    CATEGORIES_SEARCH_CONFIG,
  )
  @ApiPaginationQuery(CATEGORIES_SEARCH_CONFIG)
  @AdminAccess()
  @Roles('MODERATOR', 'EDITOR', 'BASIC')
  @Get('search')
  public async searchCategories(
    @Paginate() query: PaginateQuery,
    @Request() request: Request
  ): Promise<Paginated<CategoriesEntity>> {
    return this.categoriesService.searchCategories(query, request);
  }

  @ApiOkPaginatedResponse(
    CategoryUpdateDTO,
    CATEGORIES_FILTER_CONFIG,
  )
  @ApiPaginationQuery(CATEGORIES_FILTER_CONFIG)
  @AdminAccess()
  @Roles('MODERATOR', 'EDITOR', 'BASIC')
  @Get('filter')
  public async filterCategories(
    @Paginate() query: PaginateQuery,
    @Request() request: Request
  ): Promise<Paginated<CategoriesEntity>> {
    return this.categoriesService.filterCategories(query, request);
  }
}
