import { Injectable } from '@nestjs/common';

@Injectable()
export class CategoriesService {
  getCategories(): string {
    return 'Hello World Categories!';
  }
}
