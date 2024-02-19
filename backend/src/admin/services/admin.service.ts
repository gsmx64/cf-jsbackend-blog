/**
 * Service responsible for handling administrative operations.
 */
import { Inject, Injectable } from '@nestjs/common';
import { DeleteResult, UpdateResult } from 'typeorm';
import { PaginateQuery, Paginated } from 'nestjs-paginate';

import { UsersEntity } from '../../users/entities/users.entity';
import { CategoriesEntity } from '../../categories/entities/categories.entity';
import { PostsEntity } from '../../posts/entities/posts.entity';
import { CommentsEntity } from '../../comments/entities/comments.entity';
import { UserUpdateDTO } from '../../users/dto/user.update.dto';
import { CategoryCreateDTO } from '../../categories/dto/category.create.dto';
import { CategoryUpdateDTO } from '../../categories/dto/category.update.dto';
import { PostUpdateDTO } from '../../posts/dto/post.update.dto';
import { CommentUpdateDTO } from '../../comments/dto/comment.update.dto';
import { UsersService } from '../../users/services/users.service';
import { CategoriesService } from '../../categories/services/categories.service';
import { PostsService } from '../../posts/services/posts.service';
import { CommentsService } from '../../comments/services/comments.service';
import { SearchService } from '../../search/services/search.service';


/**
 * Service class for handling administrative operations.
 */
@Injectable()
export class AdminService {
  constructor(
    @Inject(UsersService)
    private readonly userService: UsersService,
    
    @Inject(CategoriesService)
    private readonly categoryService: CategoriesService,

    @Inject(PostsService)
    private readonly postService: PostsService,

    @Inject(CommentsService)
    private readonly commentService: CommentsService,

    @Inject(SearchService)
    private readonly searchService: SearchService
  ) {}

  /**
   * Updates a user.
   * @param body - The updated user data.
   * @param id - The ID of the user to update.
   * @param request - The request object.
   * @returns The update result.
   */
  public async updateUser(
    body: UserUpdateDTO,
    id: string,
    request: any
  ): Promise<UpdateResult | undefined>{
    return await this.userService.updateUser(body, id, request);
  }

  /**
   * Deletes a user.
   * @param id - The ID of the user to delete.
   * @returns The delete result.
   */
  public async deleteUser(
    id: string,
  ): Promise<DeleteResult | undefined>{
    return await this.userService.deleteUser(id);
  }

  /**
   * Finds a user by ID.
   * @param id - The ID of the user to find.
   * @returns The found user.
   */
  public async findOneUser(
    id: string
  ): Promise<UsersEntity> {
    return await this.userService.findOneUser(id);
  }

  /**
   * Finds the profile of the authenticated user.
   * @param request - The request object.
   * @returns The user's profile.
   */
  public async findOwnProfile(request: any): Promise<any> {
    return await this.userService.findOwnProfile(request);
  }

  /**
   * Finds all users.
   * @param query - The pagination query.
   * @returns The paginated list of users.
   */
  public async findAllUsers(
    query: PaginateQuery
  ): Promise<Paginated<UsersEntity>> {
    return await this.userService.findAllUsers(query);
  }

  /**
   * Creates a new category.
   * @param body - The category data.
   * @returns The created category.
   */
  public async createCategory(
    body: CategoryCreateDTO
  ): Promise<CategoriesEntity> {
    return await this.categoryService.createCategory(body);
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
    return await this.categoryService.updateCategory(body, id);
  }

  /**
   * Deletes a category.
   * @param id - The ID of the category to delete.
   * @returns The delete result.
   */
  public async deleteCategory(
    id: string,
  ): Promise<DeleteResult | undefined>{
    return await this.categoryService.deleteCategory(id);
  }

  /**
   * Finds a category by ID.
   * @param id - The ID of the category to find.
   * @returns The found category.
   */
  public async findOneCategory(
    id: string
  ): Promise<CategoriesEntity> {
    return await this.categoryService.findOneCategory(id);
  }

  /**
   * Finds all categories.
   * @param query - The pagination query.
   * @returns The paginated list of categories.
   */
  public async findAllCategories(
    query: PaginateQuery
  ): Promise<Paginated<CategoriesEntity>> {
    return await this.categoryService.findAllCategories(query);
  }

  /**
   * Updates a post.
   * @param body - The updated post data.
   * @param id - The ID of the post to update.
   * @returns The update result.
   */
  public async updatePost(
    body: PostUpdateDTO,
    id: string,
  ): Promise<UpdateResult | undefined>{
    return await this.postService.updatePost(body, id);
  }

  /**
   * Deletes a post.
   * @param id - The ID of the post to delete.
   * @returns The delete result.
   */
  public async deletePost(
    id: string,
  ): Promise<DeleteResult | undefined>{
    return await this.postService.deletePost(id);
  }

  /**
   * Finds a post by ID.
   * @param id - The ID of the post to find.
   * @returns The found post.
   */
  public async findOnePost(
    id: string
  ): Promise<PostsEntity> {
    return await this.postService.findOnePost(id);
  }

  /**
   * Finds all posts by a user.
   * @param id - The ID of the user.
   * @param query - The pagination query.
   * @returns The paginated list of posts.
   */
  public async findPostsByUser(
    id: string,
    query: PaginateQuery
  ): Promise<Paginated<PostsEntity>> {
    return await this.postService.findPostsByUser(id, query);
  }

  /**
   * Finds all posts.
   * @param query - The pagination query.
   * @returns The paginated list of posts.
   */
  public async findAllPosts(
    query: PaginateQuery
  ): Promise<Paginated<PostsEntity>> {
    return await this.postService.findAllPosts(query);
  }

  /**
   * Updates a comment.
   * @param body - The updated comment data.
   * @param id - The ID of the comment to update.
   * @returns The update result.
   */
  public async updateComment(
    body: CommentUpdateDTO,
    id: string,
  ): Promise<UpdateResult | undefined>{
    return await this.commentService.updateComment(body, id);
  }

  /**
   * Deletes a comment.
   * @param id - The ID of the comment to delete.
   * @returns The delete result.
   */
  public async deleteComment(
    id: string,
  ): Promise<DeleteResult | undefined>{
    return await this.commentService.deleteComment(id);
  }

  /**
   * Finds a comment by ID.
   * @param id - The ID of the comment to find.
   * @returns The found comment.
   */
  public async findOneComment(
    id: string
  ): Promise<CommentsEntity> {
    return await this.commentService.findOneComment(id);
  }

  /**
   * Finds all comments.
   * @param query - The pagination query.
   * @returns The paginated list of comments.
   */
  public async findAllComments(
    query: PaginateQuery
  ): Promise<Paginated<CommentsEntity>> {
    return await this.commentService.findAllComments(query);
  }

  /**
   * Searches for users based on the provided query parameters.
   * @param query - The query parameters for pagination.
   * @returns A promise that resolves to a paginated list of users.
   */
  public async searchUsers(
    query: PaginateQuery
  ): Promise<Paginated<UsersEntity>> {
    return await this.searchService.searchUsers(query);
  }

  /**
   * Searches for categories based on the provided query parameters.
   * @param query - The query parameters for pagination.
   * @returns A promise that resolves to a paginated list of users.
   */
  public async searchCategories(
    query: PaginateQuery
  ): Promise<Paginated<CategoriesEntity>> {
    return await this.searchService.searchCategories(query);
  }

  /**
   * Searches for posts based on the provided query parameters.
   * @param query - The query parameters for pagination.
   * @returns A promise that resolves to a paginated list of users.
   */
  public async searchPosts(
    query: PaginateQuery
  ): Promise<Paginated<PostsEntity>> {
    return await this.searchService.searchPosts(query);
  }

  /**
   * Searches for comments based on the provided query parameters.
   * @param query - The query parameters for pagination.
   * @returns A promise that resolves to a paginated list of users.
   */
  public async searchComments(
    query: PaginateQuery
  ): Promise<Paginated<CommentsEntity>> {
    return await this.searchService.searchComments(query);
  }
}