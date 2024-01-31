import { Inject, Injectable } from '@nestjs/common';
import { REQUEST } from '@nestjs/core';
import { DeleteResult, Repository, UpdateResult } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import { IPaginationOptions, Pagination, paginate as paginate_ntp } from 'nestjs-typeorm-paginate';
import { PaginateQuery, paginate, Paginated } from 'nestjs-paginate';

import { PostsEntity } from '../entities/posts.entity';
import { PostCreateDTO } from '../dto/post.create.dto';
import { PostUpdateDTO } from '../dto/post.update.dto';
import { ErrorManager } from '../../utils/error.manager';
import { PUBLISH_STATUS } from '../../constants/publish.status';
import { LoggingMessages } from '../../utils/logging.messages';
import { POSTS_FILTER_CONFIG, POSTS_FILTER_CONFIG_LOW } from '../filters/posts.filter';
import { POSTS_SEARCH_CONFIG, POSTS_SEARCH_CONFIG_LOW } from '../filters/posts.search';
import { ROLES } from '../../constants/roles';
import { useToken } from '../../utils/use.token';
import { IUseToken } from '../../auth/interfaces/auth.interface';


@Injectable()
export class PostsService {
  private cTokenForLog: string;

  constructor(
    @Inject(REQUEST) private request: Request,

    @InjectRepository(PostsEntity)
    private readonly postRepository: Repository<PostsEntity>,
  ) {
    this.cTokenForLog = (
      (process.env.NODE_ENV.trim() != 'production') &&
      (String(process.env.LOGGING_ENABLE) === 'true')
    ) ? request.headers['access_token'] : null;
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

      LoggingMessages.log(post, 'PostsService.createPost(body) -> post', this.cTokenForLog);
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

      LoggingMessages.log(post, 'PostsService.updatePost(body, id) -> post', this.cTokenForLog);
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

      LoggingMessages.log(post, 'PostsService.deletePost(id) -> post', this.cTokenForLog);
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
          .leftJoinAndSelect('post.author', 'author')
          .leftJoinAndSelect('author.posts', 'posts_users')
          .leftJoinAndSelect('post.category', 'category')
          .leftJoinAndSelect('category.posts', 'posts_category')
          .leftJoinAndSelect('post.comments', 'comments')
          .leftJoinAndSelect('comments.post', 'comment')
          .getOne();

      if(!post) {
        throw new ErrorManager({
          type: 'BAD_REQUEST',
          message: 'Post not found.'
        });
      }

      LoggingMessages.log(post, 'PostsService.findOnePost(id) -> post', this.cTokenForLog);
      return post;
    } catch(error){
      throw ErrorManager.createSignatureError(error.message);
    }
  }

  public async findAllPosts(
    options: IPaginationOptions 
  ): Promise<Pagination<PostsEntity>> {
    try {
      const queryBuilder = this.postRepository
          .createQueryBuilder('posts')
          .orderBy('posts.created_at', 'DESC');

      const posts = await paginate_ntp<PostsEntity>(queryBuilder, options);

      if(Object.keys(posts.items).length === 0) {
        throw new ErrorManager({
          type: 'BAD_REQUEST',
          message: 'No posts found.'
        });
      }

      LoggingMessages.log(posts, 'PostsService.findAllPosts() -> posts', this.cTokenForLog);
      return posts;
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
        (roleUser == ROLES.BASIC ? POSTS_SEARCH_CONFIG_LOW : POSTS_SEARCH_CONFIG)
      )

      if(Object.keys(posts.data).length === 0) {
        throw new ErrorManager({
          type: 'BAD_REQUEST',
          message: 'No se encontraron posts.'
        });
      }

      LoggingMessages.log(posts, 'PostsService.searchPosts() -> posts', this.cTokenForLog);
      return posts;
    } catch(error){
      throw ErrorManager.createSignatureError(error.message);
    }
  }

  public async filterPosts(
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
        (roleUser == ROLES.BASIC ? POSTS_FILTER_CONFIG_LOW : POSTS_FILTER_CONFIG)
      )

      if(Object.keys(posts.data).length === 0) {
        throw new ErrorManager({
          type: 'BAD_REQUEST',
          message: 'No posts found.'
        });
      }

      LoggingMessages.log(posts, 'PostsService.filterPosts() -> posts', this.cTokenForLog);
      return posts;
    } catch(error){
      throw ErrorManager.createSignatureError(error.message);
    }
  }
}
