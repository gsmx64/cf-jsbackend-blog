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

  public async updateUser(
    body: UserUpdateDTO,
    id: string,
    request: any
  ): Promise<UpdateResult | undefined>{
    return await this.userService.updateUser(body, id, request);
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
    query: PaginateQuery
  ): Promise<Paginated<UsersEntity>> {
    return await this.userService.findAllUsers(query);
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
    query: PaginateQuery
  ): Promise<Paginated<CategoriesEntity>> {
    return await this.categoryService.findAllCategories(query);
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

  public async findPostsByUser(
    id: string,
    query: PaginateQuery
  ): Promise<Paginated<PostsEntity>> {
    return await this.postService.findPostsByUser(id, query);
  }

  public async findAllPosts(
    query: PaginateQuery
  ): Promise<Paginated<PostsEntity>> {
    return await this.postService.findAllPosts(query);
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
    query: PaginateQuery
  ): Promise<Paginated<CommentsEntity>> {
    return await this.commentService.findAllComments(query);
  }

  public async searchUsers(
    query: PaginateQuery
  ): Promise<Paginated<UsersEntity>> {
    return await this.searchService.searchUsers(query);
  }

  public async searchCategories(
    query: PaginateQuery
  ): Promise<Paginated<CategoriesEntity>> {
    return await this.searchService.searchCategories(query);
  }

  public async searchPosts(
    query: PaginateQuery
  ): Promise<Paginated<PostsEntity>> {
    return await this.searchService.searchPosts(query);
  }

  public async searchComments(
    query: PaginateQuery
  ): Promise<Paginated<CommentsEntity>> {
    return await this.searchService.searchComments(query);
  }  
}
