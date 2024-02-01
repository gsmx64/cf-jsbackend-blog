import { Inject, Injectable } from '@nestjs/common';
import { DeleteResult, UpdateResult } from 'typeorm';
import { IPaginationOptions, Pagination } from 'nestjs-typeorm-paginate';
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


@Injectable()
export class AdminService {
  constructor(
    @Inject(UsersService)
    private readonly userService: UsersService,
    
    @Inject(CategoriesService)
    private readonly categoryService: CategoriesService,

    @Inject(PostsService)
    private readonly postService: PostsService,

    @Inject(PostsService)
    private readonly commentService: CommentsService,

    @Inject(PostsService)
    private readonly searchService: SearchService
  ) {}

  public async updateUser(
    body: UserUpdateDTO,
    id: string,
  ): Promise<UpdateResult | undefined>{
    return await this.userService.updateUser(body, id);
  }

  public async deleteUser(
    id: string,
  ): Promise<DeleteResult | undefined>{
    return await this.userService.deleteUser(id);
  }

  public async findOneUser(
    id: string
  ): Promise<UsersEntity> {
    return await this.userService.findOneUser(id);
  }

  public async findOwnProfile(request: any): Promise<any> {
    return await this.userService.findOwnProfile(request);
  }

  public async findAllUsers(
    options: IPaginationOptions
  ): Promise<Pagination<UsersEntity>> {
    return await this.userService.findAllUsers(options);
  }

  public async createCategory(
    body: CategoryCreateDTO
  ): Promise<CategoriesEntity> {
    return await this.categoryService.createCategory(body);
  }

  public async updateCategory(
    body: CategoryUpdateDTO,
    id: string,
  ): Promise<UpdateResult | undefined>{
    return await this.categoryService.updateCategory(body, id);
  }

  public async deleteCategory(
    id: string,
  ): Promise<DeleteResult | undefined>{
    return await this.categoryService.deleteCategory(id);
  }

  public async findOneCategory(
    id: string
  ): Promise<CategoriesEntity> {
    return await this.categoryService.findOneCategory(id);
  }

  public async findAllCategories(
    options: IPaginationOptions
  ): Promise<Pagination<CategoriesEntity>> {
    return await this.categoryService.findAllCategories(options);
  }

  public async updatePost(
    body: PostUpdateDTO,
    id: string,
  ): Promise<UpdateResult | undefined>{
    return await this.postService.updatePost(body, id);
  }

  public async deletePost(
    id: string,
  ): Promise<DeleteResult | undefined>{
    return await this.postService.deletePost(id);
  }

  public async findOnePost(
    id: string
  ): Promise<PostsEntity> {
    return await this.postService.findOnePost(id);
  }

  public async findAllPosts(
    options: IPaginationOptions
  ): Promise<Pagination<PostsEntity>> {
    return await this.postService.findAllPosts(options);
  }

  public async updateComment(
    body: CommentUpdateDTO,
    id: string,
  ): Promise<UpdateResult | undefined>{
    return await this.commentService.updateComment(body, id);
  }

  public async deleteComment(
    id: string,
  ): Promise<DeleteResult | undefined>{
    return await this.commentService.deleteComment(id);
  }

  public async findOneComment(
    id: string
  ): Promise<CommentsEntity> {
    return await this.commentService.findOneComment(id);
  }

  public async findAllComments(
    options: IPaginationOptions
  ): Promise<Pagination<CommentsEntity>> {
    return await this.commentService.findAllComments(options);
  }

  public async searchUsers(
    query: PaginateQuery
  ): Promise<Paginated<UsersEntity>> {
    return await this.searchService.searchUsers(query);
  }

  public async searchCategories(
    query: PaginateQuery,
    request: any
  ): Promise<Paginated<CategoriesEntity>> {
    return await this.searchService.searchCategories(query, request);
  }

  public async searchPosts(
    query: PaginateQuery,
    request: any
  ): Promise<Paginated<PostsEntity>> {
    return await this.searchService.searchPosts(query, request);
  }

  public async searchComments(
    query: PaginateQuery
  ): Promise<Paginated<CommentsEntity>> {
    return await this.searchService.searchComments(query);
  }  
}
