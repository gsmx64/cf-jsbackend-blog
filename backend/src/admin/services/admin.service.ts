import { Inject, Injectable } from '@nestjs/common';
import { DeleteResult, UpdateResult } from 'typeorm';

import { UsersEntity } from '../../users/entities/users.entity';
import { UserUpdateDTO } from '../../users/dto/user.update.dto';
import { UsersService } from '../../users/services/users.service';
import { PostsEntity } from '../../posts/entities/posts.entity';
import { PostUpdateDTO } from '../../posts/dto/post.update.dto';
import { PostsService } from '../../posts/services/posts.service';
import { CategoriesEntity } from '../../categories/entities/categories.entity';
import { CategoryDTO } from '../../categories/dto/category.dto';
import { CategoryUpdateDTO } from '../../categories/dto/category.update.dto';
import { CategoriesService } from '../../categories/services/categories.service';


@Injectable()
export class AdminService {
  constructor(
    @Inject(UsersService)
    private readonly userService: UsersService,
    
    @Inject(CategoriesService)
    private readonly categoryService: CategoriesService,

    @Inject(PostsService)
    private readonly postService: PostsService
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

  public async findAllUsers(): Promise<UsersEntity[]> {
    return await this.userService.findAllUsers();
  }

  public async createCategory(
    body: CategoryDTO
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

  public async findAllCategories(): Promise<CategoriesEntity[]> {
    return await this.categoryService.findAllCategories();
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

  public async findAllPosts(): Promise<PostsEntity[]> {
    return await this.postService.findAllPosts();
  }
}
