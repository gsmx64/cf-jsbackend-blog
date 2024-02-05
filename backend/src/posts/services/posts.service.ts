import { Inject, Injectable } from '@nestjs/common';
import { REQUEST } from '@nestjs/core';
import { DeleteResult, Repository, UpdateResult } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import { PaginateQuery, paginate, Paginated, PaginateConfig } from 'nestjs-paginate';

import { PostsEntity } from '../entities/posts.entity';
import { PostCreateDTO } from '../dto/post.create.dto';
import { PostUpdateDTO } from '../dto/post.update.dto';
import { ErrorManager } from '../../utils/error.manager';
import { PUBLISH_STATUS } from '../../constants/publish.status';
import { UsersService } from '../../users/services/users.service';
import { TypeUserRoleforLogging } from '../../auth/interfaces/auth.interface';
import { LoggingMessages } from '../../utils/logging.messages';
import {
  POSTS_DEFAULT_CONFIG,
  POSTS_DEFAULT_CONFIG_LOW } from '../filters/posts.default';
import {
  POSTS_FILTER_CONFIG,
  POSTS_FILTER_CONFIG_LOW } from '../filters/posts.filter';
import {
  POSTS_SEARCH_CONFIG,
  POSTS_SEARCH_CONFIG_LOW } from '../filters/posts.search';


@Injectable()
export class PostsService {
  private dataForLog: TypeUserRoleforLogging;

  constructor(
    @Inject(REQUEST) private request: Request,

    @InjectRepository(PostsEntity)
    private readonly postRepository: Repository<PostsEntity>,

    private userService: UsersService
  ) {
    this.dataForLog = this.userService.getUserRoleforLogging(this.request);
  }

  public async createPost(
    body: PostCreateDTO
  ): Promise<PostsEntity> {
    try{
      const statusOverride = 'UNPUBLISHED' as PUBLISH_STATUS;
      const post: PostsEntity = await this.postRepository
          .save({ ...body, status: statusOverride });

      if(!post) {
        throw new ErrorManager({
          type: 'BAD_REQUEST',
          message: 'Error while creating the post.'
        });
      }

      LoggingMessages.log(post, 'PostsService.createPost(body) -> post', this.dataForLog);
      return post;
    } catch(error){
      throw ErrorManager.createSignatureError(error.message);
    }
  }

  public async updatePost(
    body: PostUpdateDTO,
    id: string,
  ): Promise<UpdateResult | undefined>{
    try{
      const post: UpdateResult = await this.postRepository.update(id, body);

      if(post.affected === 0){
        throw new ErrorManager({
          type: 'BAD_REQUEST',
          message: 'Error while updating the post.'
        });
      }

      LoggingMessages.log(post, 'PostsService.updatePost(body, id) -> post', this.dataForLog);
      return post;
    } catch(error){
      throw ErrorManager.createSignatureError(error.message);
    }
  }

  public async deletePost(
    id: string,
  ): Promise<DeleteResult | undefined>{
    try{
      const post: DeleteResult = await this.postRepository.delete(id);

      if(post.affected === 0){
        throw new ErrorManager({
          type: 'BAD_REQUEST',
          message: 'Error while deleting the post.'
        });
      }

      LoggingMessages.log(post, 'PostsService.deletePost(id) -> post', this.dataForLog);
      return post;
    } catch(error){
      throw ErrorManager.createSignatureError(error.message);
    }
  }

  public async findOnePost(
    id: string
  ): Promise<PostsEntity> {
    try{
      const post: PostsEntity = await this.postRepository
          .createQueryBuilder('post')
          .where({id})
          .andWhere(this.userService.onlyPublished('post', this.request))
          .leftJoinAndSelect('post.author', 'author')
          .leftJoinAndSelect('post.category', 'category')
          .leftJoinAndSelect('post.comments', 'comments')
          .orderBy('post.created_at', 'DESC')
          .getOne();

      if(!post) {
        throw new ErrorManager({
          type: 'BAD_REQUEST',
          message: 'Post not found.'
        });
      }

      LoggingMessages.log(post, 'PostsService.findOnePost(id) -> post', this.dataForLog);
      return post;
    } catch(error){
      throw ErrorManager.createSignatureError(error.message);
    }
  }

  public async findPostsByUser(
    id: string,
    query: PaginateQuery
  ): Promise<Paginated<PostsEntity>> {
    try {
      const queryBuilder = this.postRepository
          .createQueryBuilder('posts')
          .where('posts.author = :userId', { userId: id })
          .andWhere(this.userService.onlyPublished('posts', this.request))
          .leftJoinAndSelect('posts.author', 'author')
          .leftJoinAndSelect('posts.category', 'category')
          .leftJoinAndSelect('posts.comments', 'comments');

      const posts = await paginate(
        query,
        queryBuilder,
        (
          this.userService.isRoleBasic(this.request) ?
          POSTS_DEFAULT_CONFIG_LOW
          : POSTS_DEFAULT_CONFIG
        )
      )

      if(Object.keys(posts.data).length === 0) {
        throw new ErrorManager({
          type: 'BAD_REQUEST',
          message: 'No se encontraron posts.'
        });
      }

      LoggingMessages.log(posts, 'PostsService.findAllPosts() -> posts', this.dataForLog);
      return posts;
    } catch(error){
      throw ErrorManager.createSignatureError(error.message);
    }
  }

  public async findAllPosts(
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
        (
          this.userService.isRoleBasic(this.request) ?
          POSTS_DEFAULT_CONFIG_LOW
          : POSTS_DEFAULT_CONFIG
        )
      )

      if(Object.keys(posts.data).length === 0) {
        throw new ErrorManager({
          type: 'BAD_REQUEST',
          message: 'Posts not found.'
        });
      }

      LoggingMessages.log(posts, 'PostsService.findAllPosts() -> posts', this.dataForLog);
      return posts;
    } catch(error){
      throw ErrorManager.createSignatureError(error.message);
    }
  }

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
        (this.userService.isRoleBasic(this.request) ? POSTS_SEARCH_CONFIG_LOW : POSTS_SEARCH_CONFIG)
      )

      if(Object.keys(posts.data).length === 0) {
        throw new ErrorManager({
          type: 'BAD_REQUEST',
          message: 'No se encontraron posts.'
        });
      }

      LoggingMessages.log(posts, 'PostsService.searchPosts() -> posts', this.dataForLog);
      return posts;
    } catch(error){
      throw ErrorManager.createSignatureError(error.message);
    }
  }

  public async filterPosts(
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
        (this.userService.isRoleBasic(this.request) ? POSTS_FILTER_CONFIG_LOW : POSTS_FILTER_CONFIG)
      )

      if(Object.keys(posts.data).length === 0) {
        throw new ErrorManager({
          type: 'BAD_REQUEST',
          message: 'No posts found.'
        });
      }

      LoggingMessages.log(posts, 'PostsService.filterPosts() -> posts', this.dataForLog);
      return posts;
    } catch(error){
      throw ErrorManager.createSignatureError(error.message);
    }
  }
}
