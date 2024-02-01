import { Inject, Injectable } from '@nestjs/common';
import { REQUEST } from '@nestjs/core';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { PaginateQuery, Paginated, paginate } from 'nestjs-paginate';

import { UsersEntity } from '../../users/entities/users.entity';
import { CategoriesEntity } from '../../categories/entities/categories.entity';
import { PostsEntity } from '../../posts/entities/posts.entity';
import { CommentsEntity } from '../../comments/entities/comments.entity';
import { UsersService } from '../../users/services/users.service';
import { CategoriesService } from '../../categories/services/categories.service';
import { PostsService } from '../../posts/services/posts.service';
import { CommentsService } from '../../comments/services/comments.service';
import { LoggingMessages } from '../../utils/logging.messages';
import { ErrorManager } from '../../utils/error.manager';
import { SEARCH_USERS_CONFIG } from '../filters/search.users';
import { SEARCH_COMMENTS_CONFIG } from '../filters/search.comments';
import { useToken } from '../../utils/use.token';
import { ROLES } from '../../constants/roles';
import { SEARCH_POSTS_CONFIG, SEARCH_POSTS_CONFIG_LOW } from '../filters/search.posts';
import { SEARCH_CATEGORIES_CONFIG, SEARCH_CATEGORIES_CONFIG_LOW } from '../filters/search.categories';


@Injectable()
export class SearchService {
  private cTokenForLog: string;

  constructor(
    @Inject(REQUEST) private request: Request,

    @InjectRepository(UsersEntity)
    private readonly userRepository: Repository<UsersEntity>,

    @InjectRepository(UsersEntity)
    private readonly categoryRepository: Repository<CategoriesEntity>,

    @InjectRepository(PostsEntity)
    private readonly postRepository: Repository<PostsEntity>,

    @InjectRepository(UsersEntity)
    private readonly commentRepository: Repository<CommentsEntity>,
  ) {
    this.cTokenForLog = (
      (process.env.NODE_ENV.trim() != 'production') &&
      (String(process.env.LOGGING_ENABLE) === 'true')
    ) ? request.headers['access_token'] : null;
  }

  public async searchUsers(
    query: PaginateQuery
  ): Promise<Paginated<UsersEntity>> {
    try {  
      const users = await paginate(
        query,
        this.userRepository,
        SEARCH_USERS_CONFIG
      )

      if(Object.keys(users.data).length === 0) {
        throw new ErrorManager({
          type: 'BAD_REQUEST',
          message: 'No users found.'
        });
      }

      LoggingMessages.log(users, 'SearchService.searchUsers() -> users', this.cTokenForLog);
      return users;
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
        (roleUser == ROLES.BASIC ? SEARCH_CATEGORIES_CONFIG_LOW : SEARCH_CATEGORIES_CONFIG)
      )

      if(Object.keys(categories.data).length === 0) {
        throw new ErrorManager({
          type: 'BAD_REQUEST',
          message: 'No categories found.'
        });
      }

      LoggingMessages.log(categories, 'SearchService.searchCategories() -> categories', this.cTokenForLog);
      return categories;
    } catch(error){
      throw ErrorManager.createSignatureError(error.message);
    }
  }

  public async searchPosts(
    query: PaginateQuery,
    request: any
  ): Promise<Paginated<PostsEntity>> {
    try {
      const currentToken = request.headers['access_token'];
      const manageToken: any = useToken(currentToken); 
      const roleUser = manageToken.role;

      const posts = await paginate(
        query,
        this.postRepository,
        (roleUser == ROLES.BASIC ? SEARCH_POSTS_CONFIG_LOW : SEARCH_POSTS_CONFIG)
      )

      if(Object.keys(posts.data).length === 0) {
        throw new ErrorManager({
          type: 'BAD_REQUEST',
          message: 'No posts found.'
        });
      }

      LoggingMessages.log(posts, 'SearchService.searchPosts() -> posts', this.cTokenForLog);
      return posts;
    } catch(error){
      throw ErrorManager.createSignatureError(error.message);
    }
  }

  public async searchComments(
    query: PaginateQuery
  ): Promise<Paginated<CommentsEntity>> {
    try {  
      const comments = await paginate(
        query,
        this.commentRepository,
        SEARCH_COMMENTS_CONFIG
      )

      if(Object.keys(comments.data).length === 0) {
        throw new ErrorManager({
          type: 'BAD_REQUEST',
          message: 'No users found.'
        });
      }

      LoggingMessages.log(comments, 'SearchService.searchComments() -> comments', this.cTokenForLog);
      return comments;
    } catch(error){
      throw ErrorManager.createSignatureError(error.message);
    }
  }
}