import { Body, Controller, Delete, Get, Param,
          Post, Put, UseGuards } from '@nestjs/common';
import { ApiBearerAuth, ApiParam, ApiTags } from '@nestjs/swagger';
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
import { CategoriesEntity } from '../entities/categories.entity';
import { CATEGORIES_SEARCH_CONFIG } from '../filters/categories.search';
import { CATEGORIES_FILTER_CONFIG } from '../filters/categories.filter';
import { SWAGGER_CATEGORY_BODY_EXAMPLE,
  SWAGGER_ID_EXAMPLE } from '../../constants/swagger.examples';
import { CATEGORIES_DEFAULT_CONFIG } from '../filters/categories.default';


@ApiTags('Categories')
@Controller('categories')
@UseGuards(LocalAuthGuard, LocalRolesGuard)
export class CategoriesController {
  constructor(private readonly categoriesService: CategoriesService) {}

  @ApiParam({
    name: 'body',
    type: 'string',
    required: true,
    example: SWAGGER_CATEGORY_BODY_EXAMPLE,
    description: 'The body data to create a category.'
  })
  @ApiBearerAuth('access_token')
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
    example: SWAGGER_ID_EXAMPLE,
    description: 'The category uuid to edit its data.'
  })
  @ApiBearerAuth('access_token')
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
    example: SWAGGER_ID_EXAMPLE,
    description: 'The category uuid to delete its data.'
  })
  @ApiBearerAuth('access_token')
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
    example: SWAGGER_ID_EXAMPLE,
    description: 'The category uuid to search its data.'
  })
  @ApiBearerAuth('access_token')
  @PublicAccess()
  @Get('view/:id')
  public async findOneCategory(
    @Param('id') id: string
  ) {
    return this.categoriesService.findOneCategory(id);
  }

  @ApiOkPaginatedResponse(
    CategoryUpdateDTO,
    CATEGORIES_DEFAULT_CONFIG,
  )
  @ApiPaginationQuery(CATEGORIES_DEFAULT_CONFIG)
  @ApiBearerAuth('access_token')
  @PublicAccess()
  @Get('list')
  public async findAllCategories(
    @Paginate() query: PaginateQuery
  ): Promise<Paginated<CategoriesEntity>> {
    return this.categoriesService.findAllCategories(query);
  }

  @ApiOkPaginatedResponse(
    CategoryUpdateDTO,
    CATEGORIES_SEARCH_CONFIG,
  )
  @ApiPaginationQuery(CATEGORIES_SEARCH_CONFIG)
  @ApiBearerAuth('access_token')
  @AdminAccess()
  @Roles('MODERATOR', 'EDITOR', 'BASIC')
  @Get('search')
  public async searchCategories(
    @Paginate() query: PaginateQuery
  ): Promise<Paginated<CategoriesEntity>> {
    return this.categoriesService.searchCategories(query);
  }

  @ApiOkPaginatedResponse(
    CategoryUpdateDTO,
    CATEGORIES_FILTER_CONFIG,
  )
  @ApiPaginationQuery(CATEGORIES_FILTER_CONFIG)
  @ApiBearerAuth('access_token')
  @AdminAccess()
  @Roles('MODERATOR', 'EDITOR', 'BASIC')
  @Get('filter')
  public async filterCategories(
    @Paginate() query: PaginateQuery
  ): Promise<Paginated<CategoriesEntity>> {
    return this.categoriesService.filterCategories(query);
  }
}
