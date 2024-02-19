/**
 * Service responsible for handling searches operations.
 */
import { Inject, Injectable } from '@nestjs/common';
import { REQUEST } from '@nestjs/core';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { PaginateQuery, Paginated, paginate } from 'nestjs-paginate';

import { UsersEntity } from '../../users/entities/users.entity';
import { CategoriesEntity } from '../../categories/entities/categories.entity';
import { PostsEntity } from '../../posts/entities/posts.entity';
import { CommentsEntity } from '../../comments/entities/comments.entity';
import { TypeUserRoleforLogging } from '../../auth/interfaces/auth.interface';
import { LoggingMessages } from '../../utils/logging.messages';
import { ErrorManager } from '../../utils/error.manager';
import { SEARCH_USERS_CONFIG, SEARCH_USERS_CONFIG_LOW } from '../filters/search.users';
import { SEARCH_COMMENTS_CONFIG } from '../filters/search.comments';
import { UsersService } from '../../users/services/users.service';
import { SEARCH_POSTS_CONFIG,
  SEARCH_POSTS_CONFIG_LOW } from '../filters/search.posts';
import { SEARCH_CATEGORIES_CONFIG,
  SEARCH_CATEGORIES_CONFIG_LOW } from '../filters/search.categories';


/**
 * Service class for handling searches operations.
 */
@Injectable()
export class SearchService {
  private dataForLog: TypeUserRoleforLogging;

  constructor(
    @Inject(REQUEST) private request: Request,

    @InjectRepository(UsersEntity)
    private readonly userRepository: Repository<UsersEntity>,

    @InjectRepository(CategoriesEntity)
    private readonly categoryRepository: Repository<CategoriesEntity>,

    @InjectRepository(PostsEntity)
    private readonly postRepository: Repository<PostsEntity>,

    @InjectRepository(CommentsEntity)
    private readonly commentRepository: Repository<CommentsEntity>,

    private userService: UsersService
  ) {
    this.dataForLog = this.userService.getUserRoleforLogging(this.request);
  }

  /**
   * Searches for users based on the provided query parameters.
   * @param query - The query parameters for pagination.
   * @returns A promise that resolves to a paginated list of users.
   */
  public async searchUsers(
    query: PaginateQuery
  ): Promise<Paginated<UsersEntity>> {
    try {  
      const queryBuilder = this.userRepository
        .createQueryBuilder('users')
        .where(this.userService.onlyEnabledUsers(this.request))
        .leftJoin('users.posts', 'posts', this.userService.onlyPublished('posts', this.request))
        .addSelect([
          'posts.id', 'posts.updateAt', 'posts.title',
          'posts.description', 'posts.status', 'posts.category'
        ])
        .leftJoin('posts.category', 'posts_category', this.userService.onlyPublished('posts_category', this.request))
        .addSelect([
          'posts_category.id', 'posts_category.updateAt', 'posts_category.title',
          'posts_category.description', 'posts_category.status'
        ])
        .leftJoin('users.comments', 'comments')
        .addSelect([
          'comments.id', 'comments.message', 'comments.post'
        ])
        .leftJoin('comments.post', 'comments_post')
        .addSelect([
          'comments_post.id', 'comments_post.title', 'comments_post.updateAt'
        ]);

      const users = await paginate(
        query,
        queryBuilder,
        (this.userService.isRoleBasic(this.request) ? SEARCH_USERS_CONFIG_LOW : SEARCH_USERS_CONFIG)
      )

      if(Object.keys(users.data).length === 0) {
        throw new ErrorManager({
          type: 'BAD_REQUEST',
          message: 'No users found.'
        });
      }

      LoggingMessages.log(users, 'SearchService.searchUsers() -> users', this.dataForLog);
      return users;
    } catch(error){
      throw ErrorManager.createSignatureError(error.message);
    }
  }

  /**
   * Searches for categories based on the provided query parameters.
   * @param query - The query parameters for pagination.
   * @returns A promise that resolves to a paginated list of users.
   */
  public async searchCategories(
    query: PaginateQuery
  ): Promise<Paginated<CategoriesEntity>> {
    try {
      const queryBuilder = this.categoryRepository
          .createQueryBuilder('categories')
          .where(this.userService.onlyPublished('categories', this.request))
          .leftJoinAndSelect('categories.author', 'author')
          .leftJoinAndSelect('categories.posts', 'posts');

      const categories = await paginate(
        query,
        queryBuilder,
        (this.userService.isRoleBasic(this.request) ? SEARCH_CATEGORIES_CONFIG_LOW : SEARCH_CATEGORIES_CONFIG)
      )

      if(Object.keys(categories.data).length === 0) {
        throw new ErrorManager({
          type: 'BAD_REQUEST',
          message: 'No categories found.'
        });
      }

      LoggingMessages.log(categories, 'SearchService.searchCategories() -> categories', this.dataForLog);
      return categories;
    } catch(error){
      throw ErrorManager.createSignatureError(error.message);
    }
  }

  /**
   * Searches for posts based on the provided query parameters.
   * @param query - The query parameters for pagination.
   * @returns A promise that resolves to a paginated list of users.
   */
  public async searchPosts(
    query: PaginateQuery
  ): Promise<Paginated<PostsEntity>> {
    try {
      const queryBuilder = this.postRepository
          .createQueryBuilder('posts')
          .where(this.userService.onlyPublished('posts', this.request))
          .leftJoinAndSelect('posts.author', 'author')
          .leftJoinAndSelect('posts.category', 'category')
          .leftJoinAndSelect('posts.comments', 'comments');

      const posts = await paginate(
        query,
        queryBuilder,
        (this.userService.isRoleBasic(this.request) ? SEARCH_POSTS_CONFIG_LOW : SEARCH_POSTS_CONFIG)
      )

      if(Object.keys(posts.data).length === 0) {
        throw new ErrorManager({
          type: 'BAD_REQUEST',
          message: 'No posts found.'
        });
      }

      LoggingMessages.log(posts, 'SearchService.searchPosts() -> posts', this.dataForLog);
      return posts;
    } catch(error){
      throw ErrorManager.createSignatureError(error.message);
    }
  }

  /**
   * Searches for comments based on the provided query parameters.
   * @param query - The query parameters for pagination.
   * @returns A promise that resolves to a paginated list of users.
   */
  public async searchComments(
    query: PaginateQuery
  ): Promise<Paginated<CommentsEntity>> {
    try {  
      const queryBuilder = this.commentRepository
          .createQueryBuilder('comments')
          .leftJoinAndSelect('comments.author', 'author')
          .leftJoinAndSelect('comments.post', 'post');

      const comments = await paginate(
        query,
        queryBuilder,
        SEARCH_COMMENTS_CONFIG
      )

      if(Object.keys(comments.data).length === 0) {
        throw new ErrorManager({
          type: 'BAD_REQUEST',
          message: 'No users found.'
        });
      }

      LoggingMessages.log(comments, 'SearchService.searchComments() -> comments', this.dataForLog);
      return comments;
    } catch(error){
      throw ErrorManager.createSignatureError(error.message);
    }
  }
}