import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { DeleteResult, Repository, UpdateResult } from 'typeorm';

import { CategoriesEntity } from '../entities/categories.entity';
import { CategoryDTO } from '../dto/category.dto';
import { CategoryUpdateDTO } from '../dto/category.update.dto';
import { ErrorManager } from '../../utils/error.manager';


@Injectable()
export class CategoriesService {
  constructor(
    @InjectRepository(CategoriesEntity)
    private readonly categoryRepository: Repository<CategoriesEntity>,
  ){}

  public async createCategory(
    body: CategoryDTO
  ): Promise<CategoriesEntity> {
    try{
      const category: CategoriesEntity = await this.categoryRepository.save(body);
      if(!category) {
        throw new ErrorManager({
          type: 'BAD_REQUEST',
          message: 'No se creó la categoría'
        });
      }
      return category;
    } catch(error){
      throw ErrorManager.createSignatureError(error.message);
    }
  }

  public async updateCategory(
    body: CategoryUpdateDTO,
    id: string,
  ): Promise<UpdateResult | undefined>{
    try{
      const category: UpdateResult = await this.categoryRepository.update(id, body);
      if(category.affected === 0){
        throw new ErrorManager({
          type: 'BAD_REQUEST',
          message: 'No se actualizó la categoría'
        });
      }
      return category;
    } catch(error){
      throw ErrorManager.createSignatureError(error.message);
    }
  }

  public async deleteCategory(
    id: string,
  ): Promise<DeleteResult | undefined>{
    try{
      const category: DeleteResult = await this.categoryRepository.delete(id);
      if(category.affected === 0){
        throw new ErrorManager({
          type: 'BAD_REQUEST',
          message: 'No se eliminó la categoría'
        });
      }
      return category;
    } catch(error){
      throw ErrorManager.createSignatureError(error.message);
    }
  }

  public async findOneCategory(
    id: string
  ): Promise<CategoriesEntity> {
    try{
      const category: CategoriesEntity = await this.categoryRepository
          .createQueryBuilder('category')
          .where({id})
          .leftJoinAndSelect('category.posts', 'posts')
          .leftJoinAndSelect('posts.category', 'category_posts')          
          .getOne();
      if(!category) {
        throw new ErrorManager({
          type: 'BAD_REQUEST',
          message: 'No se encontró la categoría'
        });
      }
      return category;
    } catch(error){
      throw ErrorManager.createSignatureError(error.message);
    }
  }

  public async findAllCategories(): Promise<CategoriesEntity[]> {
    try{
      const categories: CategoriesEntity[] = await this.categoryRepository.find();
      if(categories.length === 0) {
        throw new ErrorManager({
          type: 'BAD_REQUEST',
          message: 'No se encontraron categorías'
        });
      }
      return categories;
    } catch(error){
      throw ErrorManager.createSignatureError(error.message);
    }
  }

}
