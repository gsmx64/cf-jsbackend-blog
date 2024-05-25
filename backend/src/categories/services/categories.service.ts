/**
 * Service responsible for handling categories operations.
 */
import { Inject, Injectable } from '@nestjs/common';
import { REQUEST } from '@nestjs/core';
import { DeleteResult, Repository, UpdateResult } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import { PaginateQuery, paginate, Paginated } from 'nestjs-paginate';

import { CategoriesEntity } from '../entities/categories.entity';
import { CategoryCreateDTO } from '../dto/category.create.dto';
import { CategoryUpdateDTO } from '../dto/category.update.dto';
import { ErrorManager } from '../../utils/error.manager';
import { PUBLISH_STATUS } from '../../constants/publish.status';
import { UsersService } from '../../users/services/users.service';
import { TypeUserRoleforLogging } from '../../auth/interfaces/auth.interface';
import { LoggingMessages } from '../../utils/logging.messages';
import {
  CATEGORIES_FILTER_CONFIG,
  CATEGORIES_FILTER_CONFIG_LOW } from '../filters/categories.filter';
import {
  CATEGORIES_SEARCH_CONFIG,
  CATEGORIES_SEARCH_CONFIG_LOW } from '../filters/categories.search';
import {
  CATEGORIES_DEFAULT_CONFIG,
  CATEGORIES_DEFAULT_CONFIG_LOW } from '../filters/categories.default';
import { AuthService } from 'src/auth/services/auth.service';


/**
 * Service class for handling categories operations.
 */
@Injectable()
export class CategoriesService {
  private dataForLog: TypeUserRoleforLogging;

  constructor(
    @Inject(REQUEST) private request: Request,

    @InjectRepository(CategoriesEntity)
    private readonly categoryRepository: Repository<CategoriesEntity>,

    private authService: AuthService,
    private userService: UsersService
  ) {
    this.dataForLog = this.userService.getUserRoleforLogging(this.request);
  }

  /**
   * Creates a new category.
   * @param body - The category data.
   * @returns The created category.
   */
  public async createCategory(
    body: CategoryCreateDTO
  ): Promise<CategoriesEntity> {
    try{
      const authorOverride = this.authService.getUserId(this.request);      
      const statusOverride = 'UNPUBLISHED' as PUBLISH_STATUS;

      body = { ...body,
        status: statusOverride,
        author: await authorOverride,
      }

      const category: CategoriesEntity = await this.categoryRepository
          .save(body);

      if(!category) {
        throw new ErrorManager({
          type: 'NO_CONTENT',
          message: 'Error while creating the category.'
        });
      }

      LoggingMessages.log(category, 'CategoriesService.createCategory(body) -> category', this.dataForLog);
      return category;
    } catch(error){
      throw ErrorManager.createSignatureError(error.message);
    }
  }

  /**
   * Updates a category.
   * @param body - The updated category data.
   * @param id - The ID of the category to update.
   * @returns The update result.
   */
  public async updateCategory(
    body: CategoryUpdateDTO,
    id: string,
  ): Promise<UpdateResult | undefined>{
    try{
      const category: UpdateResult = await this.categoryRepository.update(id, body);

      if(category.affected === 0){
        throw new ErrorManager({
          type: 'NO_CONTENT',
          message: 'No changes made while updating the category.'
        });
      }

      LoggingMessages.log(category, 'CategoriesService.updateCategory(body, id) -> category', this.dataForLog);
      return category;
    } catch(error){
      throw ErrorManager.createSignatureError(error.message);
    }
  }

  /**
   * Deletes a category.
   * @param id - The ID of the category to delete.
   * @returns The delete result.
   */
  public async deleteCategory(
    id: string,
  ): Promise<DeleteResult | undefined>{
    try{
      const category: DeleteResult = await this.categoryRepository.delete(id);

      if(category.affected === 0){
        throw new ErrorManager({
          type: 'NO_CONTENT',
          message: 'Error while deleting the category.'
        });
      }

      LoggingMessages.log(category, 'CategoriesService.deleteCategory(id) -> category', this.dataForLog);
      return category;
    } catch(error){
      throw ErrorManager.createSignatureError(error.message);
    }
  }

  /**
   * Finds a category by ID.
   * @param id - The ID of the category to find.
   * @returns The found category.
   */
  public async findOneCategory(
    id: string
  ): Promise<CategoriesEntity> {
    try{
      const category: CategoriesEntity = await this.categoryRepository
          .createQueryBuilder('category')
          .where({id})
          .andWhere(this.userService.onlyPublished('category', this.request))
          .leftJoinAndSelect('category.author', 'author')
          .addSelect([
            'author.id', 'author.updateAt', 'author.username', 'author.email',
            'author.status', 'author.role', 'author.karma', 'author.avatar',
            'author.firstName', 'author.lastName', 'author.age', 'author.city',
            'author.country'
          ])
          .leftJoin('category.posts', 'posts')
          .addSelect([
            'posts.id', 'posts.title', 'posts.description', 'posts.image',
            'posts.author', 'posts.status', 'posts.updateAt'
          ])
          .leftJoin('posts.author', 'posts_author', this.userService.onlyPublished('posts', this.request))
          .addSelect([
            'posts_author.id', 'posts_author.username', 'posts_author.status'
          ])
          .orderBy('category.created_at', 'DESC')
          .getOne();

      if(!category) {
        throw new ErrorManager({
          type: 'NO_CONTENT',
          message: 'Category not found.'
        });
      }

      LoggingMessages.log(category, 'CategoriesService.findOneCategory(id) -> category', this.dataForLog);
      return category;
    } catch(error){
      throw ErrorManager.createSignatureError(error.message);
    }
  }

  /**
   * Finds all categories.
   * @param query - The pagination query.
   * @returns The paginated list of categories.
   */
  public async findAllCategories(
    query: PaginateQuery
  ): Promise<Paginated<CategoriesEntity>> {
    try {
      const queryBuilder = this.categoryRepository
          .createQueryBuilder('categories')
          .where(this.userService.onlyPublished('categories', this.request))
          .leftJoin('categories.author', 'author')
          .addSelect([
            'author.id', 'author.updateAt', 'author.username', 'author.email',
            'author.status', 'author.role', 'author.karma', 'author.avatar',
            'author.firstName', 'author.lastName', 'author.age', 'author.city',
            'author.country'
          ])
          .leftJoin('categories.posts', 'posts', this.userService.onlyPublished('posts', this.request))
          .addSelect([
            'posts.id', 'posts.title', 'posts.description', 'posts.updateAt'
          ]);

      const categories = await paginate(
        query,
        queryBuilder,
        (
          this.userService.isRoleBasic(this.request) ?
          CATEGORIES_DEFAULT_CONFIG_LOW
          : CATEGORIES_DEFAULT_CONFIG
        )
      )

      if(Object.keys(categories.data).length === 0) {
        throw new ErrorManager({
          type: 'NO_CONTENT',
          message: 'Categories not found.'
        });
      }

      LoggingMessages.log(categories, 'CategoriesService.findAllCategories() -> categories', this.dataForLog);
      return categories;
    } catch(error){
      throw ErrorManager.createSignatureError(error.message);
    }
  }

  /**
   * Searches for categories based on the provided query parameters.
   * @param query - The query parameters for pagination.
   * @returns A promise that resolves to a paginated list of categories.
   * @throws An error if no categories are found.
   */
  public async searchCategories(
    query: PaginateQuery
  ): Promise<Paginated<CategoriesEntity>> {
    try {
      const queryBuilder = this.categoryRepository
          .createQueryBuilder('categories')
          .where(this.userService.onlyPublished('categories', this.request))
          .leftJoinAndSelect('categories.author', 'author')
          .leftJoinAndSelect('categories.posts', 'posts')
          .leftJoinAndSelect('posts.author', 'posts_author');

      const categories = await paginate(
        query,
        queryBuilder,
        (this.userService.isRoleBasic(this.request) ? CATEGORIES_SEARCH_CONFIG_LOW : CATEGORIES_SEARCH_CONFIG)
      )

      if(Object.keys(categories.data).length === 0) {
        throw new ErrorManager({
          type: 'NO_CONTENT',
          message: 'Categories not found.'
        });
      }

      LoggingMessages.log(categories, 'CategoriesService.searchCategories() -> categories', this.dataForLog);
      return categories;
    } catch(error){
      throw ErrorManager.createSignatureError(error.message);
    }
  }

  /**
   * Filters for categories based on the provided query parameters.
   * @param query - The query parameters for pagination.
   * @returns A promise that resolves to a paginated list of categories.
   * @throws An error if no categories are found.
   */
  public async filterCategories(
    query: PaginateQuery
  ): Promise<Paginated<CategoriesEntity>> {
    try {
      const queryBuilder = this.categoryRepository
          .createQueryBuilder('categories')
          .where(this.userService.onlyPublished('categories', this.request))
          .leftJoinAndSelect('categories.author', 'author')
          .leftJoinAndSelect('categories.posts', 'posts')
          .leftJoinAndSelect('posts.author', 'posts_author');

      const categories = await paginate(
        query,
        queryBuilder,
        (this.userService.isRoleBasic(this.request) ? CATEGORIES_FILTER_CONFIG_LOW : CATEGORIES_FILTER_CONFIG)
      )

      if(Object.keys(categories.data).length === 0) {
        throw new ErrorManager({
          type: 'NO_CONTENT',
          message: 'Categories not found.'
        });
      }

      LoggingMessages.log(categories, 'CategoriesService.filterCategories() -> categories', this.dataForLog);
      return categories;
    } catch(error){
      throw ErrorManager.createSignatureError(error.message);
    }
  }
}
