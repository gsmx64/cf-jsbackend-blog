import { Inject, Injectable } from '@nestjs/common';
import { REQUEST } from '@nestjs/core';
import { DeleteResult, Repository, UpdateResult } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import { IPaginationOptions, Pagination,
  paginate as paginate_ntp } from 'nestjs-typeorm-paginate';
import { PaginateQuery, paginate, Paginated } from 'nestjs-paginate';

import { CategoriesEntity } from '../entities/categories.entity';
import { CategoryCreateDTO } from '../dto/category.create.dto';
import { CategoryUpdateDTO } from '../dto/category.update.dto';
import { ErrorManager } from '../../utils/error.manager';
import { ROLES } from '../../constants/roles';
import { useToken } from '../../utils/use.token';
import { IUseToken } from '../../auth/interfaces/auth.interface';
import { PUBLISH_STATUS } from '../../constants/publish.status';
import { LoggingMessages } from '../../utils/logging.messages';
import {
  CATEGORIES_FILTER_CONFIG,
  CATEGORIES_FILTER_CONFIG_LOW
} from '../filters/categories.filter';
import {
  CATEGORIES_SEARCH_CONFIG,
  CATEGORIES_SEARCH_CONFIG_LOW
} from '../filters/categories.search';


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
    body: CategoryCreateDTO
  ): Promise<CategoriesEntity> {
    try{
      const statusOverride = 'UNPUBLISHED' as PUBLISH_STATUS;
      const category: CategoriesEntity = await this.categoryRepository
          .save({ ...body, status: statusOverride });

      if(!category) {
        throw new ErrorManager({
          type: 'BAD_REQUEST',
          message: 'Error while creating the category.'
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
          message: 'Error while updating the category.'
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
          message: 'Error while deleting the category.'
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
          message: 'Category not found.'
        });
      }

      LoggingMessages.log(category, 'CategoriesService.findOneCategory(id) -> category', this.cTokenForLog);
      return category;
    } catch(error){
      throw ErrorManager.createSignatureError(error.message);
    }
  }

  public async findAllCategories(
    options: IPaginationOptions 
  ): Promise<Pagination<CategoriesEntity>> {
    try {
      const queryBuilder = this.categoryRepository
          .createQueryBuilder('categories')
          .orderBy('categories.created_at', 'DESC');

      const categories = await paginate_ntp<CategoriesEntity>(queryBuilder, options);

      if(Object.keys(categories.items).length === 0) {
        throw new ErrorManager({
          type: 'BAD_REQUEST',
          message: 'No categories found.'
        });
      }

      LoggingMessages.log(categories, 'CategoriesService.findAllCategories() -> categories', this.cTokenForLog);
      return categories;
    } catch(error){
      throw ErrorManager.createSignatureError(error.message);
    }
  }

  public async searchCategories(
    query: PaginateQuery,
    request: any
  ): Promise<Paginated<CategoriesEntity>> {
    try {
      const currentToken = request.headers['access_token'];
      const manageToken: any = useToken(currentToken); 
      const roleUser = manageToken.role;

      const categories = await paginate(
        query,
        this.categoryRepository,
        (roleUser == ROLES.BASIC ? CATEGORIES_SEARCH_CONFIG_LOW : CATEGORIES_SEARCH_CONFIG)
      )

      if(Object.keys(categories.data).length === 0) {
        throw new ErrorManager({
          type: 'BAD_REQUEST',
          message: 'No categories found.'
        });
      }

      LoggingMessages.log(categories, 'CategoriesService.searchCategories() -> categories', this.cTokenForLog);
      return categories;
    } catch(error){
      throw ErrorManager.createSignatureError(error.message);
    }
  }

  public async filterCategories(
    query: PaginateQuery,
    request: any
  ): Promise<Paginated<CategoriesEntity>> {
    try {
      const currentToken = request.headers['access_token'];
      const manageToken: any = useToken(currentToken); 
      const roleUser = manageToken.role;

      const categories = await paginate(
        query,
        this.categoryRepository,
        (roleUser == ROLES.BASIC ? CATEGORIES_FILTER_CONFIG_LOW : CATEGORIES_FILTER_CONFIG)
      )

      if(Object.keys(categories.data).length === 0) {
        throw new ErrorManager({
          type: 'BAD_REQUEST',
          message: 'No categories found.'
        });
      }

      LoggingMessages.log(categories, 'CategoriesService.filterCategories() -> categories', this.cTokenForLog);
      return categories;
    } catch(error){
      throw ErrorManager.createSignatureError(error.message);
    }
  }
}
