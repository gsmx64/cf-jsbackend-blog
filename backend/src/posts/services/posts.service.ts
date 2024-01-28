import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { DeleteResult, Repository, UpdateResult } from 'typeorm';

import { PostsEntity } from '../entities/posts.entity';
import { PostDTO } from '../dto/post.dto';
import { PostUpdateDTO } from '../dto/post.update.dto';
import { ErrorManager } from '../../utils/error.manager';


@Injectable()
export class PostsService {
  constructor(
    @InjectRepository(PostsEntity)
    private readonly postRepository: Repository<PostsEntity>,
  ){}

  public async createPost(
    body: PostDTO
  ): Promise<PostsEntity> {
    try{
      const post: PostsEntity = await this.postRepository.save(body);
      if(!post) {
        throw new ErrorManager({
          type: 'BAD_REQUEST',
          message: 'No se creó el posteo.'
        });
      }
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
          .leftJoinAndSelect('comments.comment', 'comment')
          .getOne();
      if(!post) {
        throw new ErrorManager({
          type: 'BAD_REQUEST',
          message: 'No se encontró el post'
        });
      }
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
      return posts;
    } catch(error){
      throw ErrorManager.createSignatureError(error.message);
    }
  }
}
