import { Body, Controller, Get, Param, Post, UseGuards } from '@nestjs/common';

import { CategoriesService } from '../services/categories.service';
import { CategoryDTO } from '../dto/category.dto';
import { CategoryUpdateDTO } from '../dto/category.update.dto';
import { LocalAuthGuard } from '../../auth/guards/local-auth.guard';
import { LocalRolesGuard } from '../../auth/guards/local-auth.roles.guard';
import { AdminAccess } from '../../auth/decorators/admin.decorator';
import { PublicAccess } from '../../auth/decorators/public.decorator';
import { Roles } from '../../auth/decorators/roles.decorator';


@Controller('categories')
@UseGuards(LocalAuthGuard, LocalRolesGuard)
export class CategoriesController {
  constructor(private readonly categoriesService: CategoriesService) {}

  @AdminAccess()
  @Roles('MODERATOR')
  @Post('create')
  public async createCategory(
    @Body() body: CategoryDTO
  ) {
    return this.categoriesService.createCategory(body);
  }

  @AdminAccess()
  @Roles('MODERATOR')
  @Get('edit/:id')
  public async updateCategory(
    @Param('id') id: string, 
    @Body() body: CategoryUpdateDTO
  ) {
    return this.categoriesService.updateCategory(body, id);
  }

  @AdminAccess()
  @Get('delete/:id')
  public async deleteCategory(
    @Param('id') id: string
  ) {
    return this.categoriesService.deleteCategory(id);
  }

  @PublicAccess()
  @Get('view/:id')
  public async findOneCategory(
    @Param('id') id: string
  ) {
    return this.categoriesService.findOneCategory(id);
  }

  @PublicAccess()
  @Get('list')
  public async findAllCategories() {
    return this.categoriesService.findAllCategories();
  }
}
