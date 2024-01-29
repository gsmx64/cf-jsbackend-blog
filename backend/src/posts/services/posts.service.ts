import { Inject, Injectable } from '@nestjs/common';
import { REQUEST } from '@nestjs/core';
import { DeleteResult, Repository, UpdateResult } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';

import { PostsEntity } from '../entities/posts.entity';
import { PostDTO } from '../dto/post.dto';
import { PostUpdateDTO } from '../dto/post.update.dto';
import { ErrorManager } from '../../utils/error.manager';
import { PUBLISH_STATUS } from '../../constants/publishStatus';
import { LoggingMessages } from '../../utils/logging.messages';


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
    body: PostDTO
  ): Promise<PostsEntity> {
    try{
      const statusOverride = 'UNPUBLISHED' as PUBLISH_STATUS;
      const post: PostsEntity = await this.postRepository
          .save({ ...body, status: statusOverride });

      if(!post) {
        throw new ErrorManager({
          type: 'BAD_REQUEST',
          message: 'No se creó el posteo.'
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
          message: 'No se actualizó el post.'
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
          message: 'No se eliminó el post.'
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
          message: 'No se encontró el post'
        });
      }

      LoggingMessages.log(post, 'PostsService.findOnePost(id) -> post', this.cTokenForLog);
      return post;
    } catch(error){
      throw ErrorManager.createSignatureError(error.message);
    }
  }

  public async findAllPosts(): Promise<PostsEntity[]> {
    try{
      const posts: PostsEntity[] = await this.postRepository.find();

      if(posts.length === 0) {
        throw new ErrorManager({
          type: 'BAD_REQUEST',
          message: 'No se encontraron posts'
        });
      }

      LoggingMessages.log(posts, 'PostsService.findAllPosts() -> posts', this.cTokenForLog);
      return posts;
    } catch(error){
      throw ErrorManager.createSignatureError(error.message);
    }
  }
}
