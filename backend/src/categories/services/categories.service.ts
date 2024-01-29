import { Inject, Injectable } from '@nestjs/common';
import { REQUEST } from '@nestjs/core';
import { DeleteResult, Repository, UpdateResult } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';

import { CategoriesEntity } from '../entities/categories.entity';
import { CategoryDTO } from '../dto/category.dto';
import { CategoryUpdateDTO } from '../dto/category.update.dto';
import { ErrorManager } from '../../utils/error.manager';
import { PUBLISH_STATUS } from '../../constants/publishStatus';
import { LoggingMessages } from '../../utils/logging.messages';


@Injectable()
export class CategoriesService {
  private cTokenForLog: string;

  constructor(
    @Inject(REQUEST) private request: Request,

    @InjectRepository(CategoriesEntity)
    private readonly categoryRepository: Repository<CategoriesEntity>,
  ) {
    this.cTokenForLog = (
      (process.env.NODE_ENV.trim() != 'production') &&
      (String(process.env.LOGGING_ENABLE) === 'true')
    ) ? request.headers['access_token'] : null;
  }

  public async createCategory(
    body: CategoryDTO
  ): Promise<CategoriesEntity> {
    try{
      const statusOverride = 'UNPUBLISHED' as PUBLISH_STATUS;
      const category: CategoriesEntity = await this.categoryRepository
          .save({ ...body, status: statusOverride });

      if(!category) {
        throw new ErrorManager({
          type: 'BAD_REQUEST',
          message: 'No se creó la categoría'
        });
      }

      LoggingMessages.log(category, 'CategoriesService.createCategory(body) -> category', this.cTokenForLog);
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

      LoggingMessages.log(category, 'CategoriesService.updateCategory(body, id) -> category', this.cTokenForLog);
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

      LoggingMessages.log(category, 'CategoriesService.deleteCategory(id) -> category', this.cTokenForLog);
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
          .leftJoinAndSelect('category.author', 'author')
          .leftJoinAndSelect('author.categories', 'category_user')
          .leftJoinAndSelect('category.posts', 'posts')
          .leftJoinAndSelect('posts.category', 'category_posts')
          .getOne();

      if(!category) {
        throw new ErrorManager({
          type: 'BAD_REQUEST',
          message: 'No se encontró la categoría'
        });
      }

      LoggingMessages.log(category, 'CategoriesService.findOneCategory(id) -> category', this.cTokenForLog);
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

      LoggingMessages.log(categories, 'CategoriesService.findAllCategories() -> categories', this.cTokenForLog);
      return categories;
    } catch(error){
      throw ErrorManager.createSignatureError(error.message);
    }
  }

}
