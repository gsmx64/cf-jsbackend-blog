import { Controller, Get } from '@nestjs/common';
import { CategoriesService } from '../services/categories.service';

@Controller()
export class CategoriesController {
  constructor(private readonly categoriesService: CategoriesService) {}

  @Get('profile')
  getCategories(): string {
    return this.categoriesService.getCategories();
  }
}
