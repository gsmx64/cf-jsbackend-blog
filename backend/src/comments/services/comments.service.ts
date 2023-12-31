import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { DeleteResult, Repository, UpdateResult } from 'typeorm';
import { CommentsEntity } from '../entities/comments.entity';
import { CommentDTO, CommentUpdateDTO } from '../dto/comment.dto';

@Injectable()
export class CommentsService {
  constructor(
    @InjectRepository(CommentsEntity)
    private readonly commentRepository: Repository<CommentsEntity>,
  ){}

  public async createComment(
    body: CommentDTO
  ): Promise<CommentsEntity> {
    try{
      return await this.commentRepository.save(body);
    } catch(error){
      throw new Error(error);
    }
  }

  public async updateComment(
    body: CommentUpdateDTO,
    id: string,
  ): Promise<UpdateResult | undefined>{
    try{
      const comment: UpdateResult = await this.commentRepository.update(id, body);
      if(comment.affected === 0){
        return undefined;
      }
    } catch(error){
      throw new Error(error);
    }
  }

  public async deleteComment(
    id: string,
  ): Promise<DeleteResult | undefined>{
    try{
      const comment: DeleteResult = await this.commentRepository.delete(id);
      if(comment.affected === 0){
        return undefined;
      }
    } catch(error){
      throw new Error(error);
    }
  }

  public async findOneComment(
    id: string
  ): Promise<CommentsEntity> {
    try{
      return await this.commentRepository
        .createQueryBuilder('comment')
        .where({id})
        .getOne();
    } catch(error){
      throw new Error(error);
    }
  }

  public async findAllComments(): Promise<CommentsEntity[]> {
    try{
      return await this.commentRepository.find();
    } catch(error){
      throw new Error(error);
    }
  }

}
