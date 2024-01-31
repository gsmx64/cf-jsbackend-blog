import { Inject, Injectable } from '@nestjs/common';
import { PaginateQuery, Paginated } from 'nestjs-paginate';

import { UsersEntity } from '../../users/entities/users.entity';
import { CategoriesEntity } from '../../categories/entities/categories.entity';
import { PostsEntity } from '../../posts/entities/posts.entity';
import { CommentsEntity } from '../../comments/entities/comments.entity';
import { UsersService } from '../../users/services/users.service';
import { CategoriesService } from '../../categories/services/categories.service';
import { PostsService } from '../../posts/services/posts.service';
import { CommentsService } from '../../comments/services/comments.service';


@Injectable()
export class SearchService {
    constructor(
      @Inject(UsersService)
      private readonly userService: UsersService,
      
      @Inject(CategoriesService)
      private readonly categoryService: CategoriesService,
  
      @Inject(PostsService)
      private readonly postService: PostsService,

      @Inject(CommentsService)
      private readonly commentService: CommentsService
    ) {}

    public async searchUsers(
      query: PaginateQuery,
      request: any
    ): Promise<Paginated<UsersEntity>> {
      return await this.userService.searchUsers(query, request);
    }

    public async searchCategories(
      query: PaginateQuery,
      request: any
    ): Promise<Paginated<CategoriesEntity>> {
      return await this.categoryService.searchCategories(query, request);
    }

    public async searchPosts(
      query: PaginateQuery,
      request: any
    ): Promise<Paginated<PostsEntity>> {
      return await this.postService.searchPosts(query, request);
    }

    public async searchComments(
      query: PaginateQuery
    ): Promise<Paginated<CommentsEntity>> {
      return await this.commentService.searchComments(query);
    }
}