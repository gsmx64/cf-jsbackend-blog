import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { DeleteResult, Repository, UpdateResult } from 'typeorm';
import { PostsEntity } from '../entities/posts.entity';
import { PostDTO, PostUpdateDTO } from '../dto/post.dto';

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
      return await this.postRepository.save(body);
    } catch(error){
      throw new Error(error);
    }
  }

  public async updatePost(
    body: PostUpdateDTO,
    id: string,
  ): Promise<UpdateResult | undefined>{
    try{
      const post: UpdateResult = await this.postRepository.update(id, body);
      if(post.affected === 0){
        return undefined;
      }
    } catch(error){
      throw new Error(error);
    }
  }

  public async deletePost(
    id: string,
  ): Promise<DeleteResult | undefined>{
    try{
      const post: DeleteResult = await this.postRepository.delete(id);
      if(post.affected === 0){
        return undefined;
      }
    } catch(error){
      throw new Error(error);
    }
  }

  public async findOnePost(
    id: string
  ): Promise<PostsEntity> {
    try{
      return await this.postRepository
        .createQueryBuilder('post')
        .where({id})
        .getOne();
    } catch(error){
      throw new Error(error);
    }
  }

  public async findAllPosts(): Promise<PostsEntity[]> {
    try{
      return await this.postRepository.find();
    } catch(error){
      throw new Error(error);
    }
  }
}
