/**
 * Controller responsible for handling the searches related API endpoints.
 */
import { Controller, Get, Request } from '@nestjs/common';
import { ApiOkPaginatedResponse, ApiPaginationQuery, Paginate,
  PaginateQuery, Paginated } from 'nestjs-paginate';

import { SearchService } from '../services/search.service';
import { UsersEntity } from '../../users/entities/users.entity';
import { CategoriesEntity } from '../../categories/entities/categories.entity';
import { PostsEntity } from '../../posts/entities/posts.entity';
import { CommentsEntity } from '../../comments/entities/comments.entity';
import { UserUpdateDTO } from '../../users/dto/user.update.dto';
import { CategoryUpdateDTO } from '../../categories/dto/category.update.dto';
import { PostUpdateDTO } from '../../posts/dto/post.update.dto';
import { CommentUpdateDTO } from '../../comments/dto/comment.update.dto';
import { SEARCH_USERS_CONFIG } from '../filters/search.users';
import { SEARCH_CATEGORIES_CONFIG } from '../filters/search.categories';
import { SEARCH_POSTS_CONFIG } from '../filters/search.posts';
import { SEARCH_COMMENTS_CONFIG } from '../filters/search.comments';
import { AdminAccess } from '../../auth/decorators/admin.decorator';
import { Roles } from '../../auth/decorators/roles.decorator';
import { ApiBearerAuth } from '@nestjs/swagger';


/**
 * Controller responsible for handling searches operations.
 */
@Controller('search')
export class SearchController {
    constructor(
        private readonly searchService: SearchService
    ) {}

    /**
     * Searches for users based on the provided query parameters.
     * @param query The pagination query parameters.
     * @returns A paginated list of users.
     */
    @ApiOkPaginatedResponse(
      UserUpdateDTO,
      SEARCH_USERS_CONFIG,
    )
    @ApiPaginationQuery(SEARCH_USERS_CONFIG)
    @ApiBearerAuth('access_token')
    @AdminAccess()
    @Roles('MODERATOR')
    @Get('users')
    public async searchUsers(
      @Paginate() query: PaginateQuery
    ): Promise<Paginated<UsersEntity>> {
      return this.searchService.searchUsers(query);
    }

    /**
     * Filters for categories based on the provided query parameters.
     * @param query The pagination query parameters.
     * @returns A paginated list of categories.
     */
    @ApiOkPaginatedResponse(
      CategoryUpdateDTO,
      SEARCH_CATEGORIES_CONFIG,
    )
    @ApiPaginationQuery(SEARCH_CATEGORIES_CONFIG)
    @ApiBearerAuth('access_token')
    @AdminAccess()
    @Roles('MODERATOR', 'EDITOR', 'BASIC')
    @Get('categories')
    public async searchCategories(
      @Paginate() query: PaginateQuery
    ): Promise<Paginated<CategoriesEntity>> {
      return this.searchService.searchCategories(query);
    }

    /**
     * Searches for posts based on the provided query parameters.
     * @param query The pagination query parameters.
     * @returns A paginated list of posts.
     */
    @ApiOkPaginatedResponse(
      PostUpdateDTO,
      SEARCH_POSTS_CONFIG,
    )
    @ApiPaginationQuery(SEARCH_POSTS_CONFIG)
    @ApiBearerAuth('access_token')
    @AdminAccess()
    @Roles('MODERATOR', 'EDITOR', 'BASIC')
    @Get('posts')
    public async searchPosts(
      @Paginate() query: PaginateQuery
    ): Promise<Paginated<PostsEntity>> {
      return this.searchService.searchPosts(query);
    }

    /**
     * Searches for comments based on the provided query parameters.
     * @param query The pagination query parameters.
     * @returns A paginated list of comments.
     */
    @ApiOkPaginatedResponse(
      CommentUpdateDTO,
      SEARCH_COMMENTS_CONFIG,
    )
    @ApiPaginationQuery(SEARCH_COMMENTS_CONFIG)
    @ApiBearerAuth('access_token')
    @AdminAccess()
    @Roles('MODERATOR')
    @Get('comments')
    public async searchComments(
      @Paginate() query: PaginateQuery
    ): Promise<Paginated<CommentsEntity>> {
      return this.searchService.searchComments(query);
    }
}