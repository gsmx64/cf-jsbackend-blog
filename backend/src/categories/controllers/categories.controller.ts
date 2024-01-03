import { Body, Controller, Get, Param, Post } from '@nestjs/common';
import { CategoriesService } from '../services/categories.service';
import { CategoryDTO, CategoryUpdateDTO } from '../dto/category.dto';

@Controller()
export class CategoriesController {
  constructor(private readonly categoriesService: CategoriesService) {}

  @Post('create')
  public async createCategory(
    @Body() body: CategoryDTO
  ) {
    return this.categoriesService.createCategory(body);
  }

  @Get('edit/:id')
  public async updateCategory(
    @Param('id') id: string, 
    @Body() body: CategoryUpdateDTO
  ) {
    return this.categoriesService.updateCategory(body, id);
  }

  @Get('delete/:id')
  public async deleteCategory(
    @Param('id') id: string
  ) {
    return this.categoriesService.deleteCategory(id);
  }

  @Get('category/:id')
  public async findOneCategory(
    @Param('id') id: string
  ) {
    return this.categoriesService.findOneCategory(id);
  }

  @Get('categorieslist')
  public async findAllCategories() {
    return this.categoriesService.findAllCategories();
  }
}
