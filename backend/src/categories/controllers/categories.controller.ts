/**
 * Controller responsible for handling the categories related API endpoints.
 */
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


/**
 * Controller responsible for handling categories operations.
 */
@ApiTags('Categories')
@Controller('categories')
@UseGuards(LocalAuthGuard, LocalRolesGuard)
export class CategoriesController {
  constructor(private readonly categoriesService: CategoriesService) {}

  /**
   * Creates a new category.
   * @param body - The category data.
   * @returns The created category.
   */
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

  /**
   * Updates a category.
   * @param id - The ID of the category to update.
   * @param body - The updated category data.
   * @returns The updated category.
   */
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

  /**
   * Deletes a category by its ID.
   * @param id The ID of the category to delete.
   * @returns The result of the delete operation.
   */
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

  /**
   * Retrieves a single category data by its ID.
   * @param id - The ID of the category.
   * @returns The category.
   */
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

  /**
   * Retrieves all categories with pagination.
   *
   * @param query - The pagination query parameters.
   * @returns A paginated list of categories.
   */
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

  /**
   * Searches for categories based on the provided query parameters.
   * @param query The pagination query parameters.
   * @returns A paginated list of categories.
   */
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

  /**
   * Filters for categories based on the provided query parameters.
   * @param query The pagination query parameters.
   * @returns A paginated list of categories.
   */
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