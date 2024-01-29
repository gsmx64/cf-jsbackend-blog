import { Inject, Injectable } from '@nestjs/common';
import { REQUEST } from '@nestjs/core';
import { DeleteResult, Repository, UpdateResult } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';

import { CommentsEntity } from '../entities/comments.entity';
import { CommentDTO } from '../dto/comment.dto';
import { CommentUpdateDTO } from '../dto/comment.update.dto';
import { ErrorManager } from '../../utils/error.manager';
import { LoggingMessages } from '../../utils/logging.messages';


@Injectable()
export class CommentsService {
  private cTokenForLog: string;

  constructor(
    @Inject(REQUEST) private request: Request,

    @InjectRepository(CommentsEntity)
    private readonly commentRepository: Repository<CommentsEntity>,
  ) {
    this.cTokenForLog = (
      (process.env.NODE_ENV.trim() != 'production') &&
      (String(process.env.LOGGING_ENABLE) === 'true')
    ) ? request.headers['access_token'] : null;
  }

  public async createComment(
    body: CommentDTO
  ): Promise<CommentsEntity> {
    try{
      const comment: CommentsEntity = await this.commentRepository.save(body);

      if(!comment) {
        throw new ErrorManager({
          type: 'BAD_REQUEST',
          message: 'No se creó el comentario'
        });
      }

      LoggingMessages.log(comment, 'CommentsService.createComment(body) -> comment', this.cTokenForLog);
      return comment;
    } catch(error){
      throw ErrorManager.createSignatureError(error.message);
    }
  }

  public async updateComment(
    body: CommentUpdateDTO,
    id: string,
  ): Promise<UpdateResult | undefined>{
    try{
      const comment: UpdateResult = await this.commentRepository.update(id, body);

      if(comment.affected === 0){
        throw new ErrorManager({
          type: 'BAD_REQUEST',
          message: 'No se actualizó el comentario'
        });
      }

      LoggingMessages.log(comment, 'CommentsService.updateComment(body, id) -> comment', this.cTokenForLog);
      return comment;
    } catch(error){
      throw ErrorManager.createSignatureError(error.message);
    }
  }

  public async deleteComment(
    id: string,
  ): Promise<DeleteResult | undefined>{
    try{
      const comment: DeleteResult = await this.commentRepository.delete(id);

      if(comment.affected === 0){
        throw new ErrorManager({
          type: 'BAD_REQUEST',
          message: 'No se eliminó el comentario'
        });
      }

      LoggingMessages.log(comment, 'CommentsService.deleteComment(id) -> comment', this.cTokenForLog);
      return comment;
    } catch(error){
      throw ErrorManager.createSignatureError(error.message);
    }
  }

  public async findOneComment(
    id: string
  ): Promise<CommentsEntity> {
    try{
      const comment: CommentsEntity = await this.commentRepository
          .createQueryBuilder('comment')
          .where({id})
          .leftJoinAndSelect('comment.author', 'author')
          .leftJoinAndSelect('author.comments', 'comment_user')
          .leftJoinAndSelect('comment.post', 'post')
          .leftJoinAndSelect('post.comments', 'post_comment')
          .getOne();

      if(!comment) {
        throw new ErrorManager({
          type: 'BAD_REQUEST',
          message: 'No se encontró el comentario'
        });
      }

      LoggingMessages.log(comment, 'CommentsService.findOneComment(id) -> comment', this.cTokenForLog);
      return comment;
    } catch(error){
      throw ErrorManager.createSignatureError(error.message);
    }
  }

  public async findAllComments(): Promise<CommentsEntity[]> {
    try{
      const comments: CommentsEntity[] = await this.commentRepository.find();

      if(comments.length === 0) {
        throw new ErrorManager({
          type: 'BAD_REQUEST',
          message: 'No se encontraron comentarios'
        });
      }

      LoggingMessages.log(comments, 'CommentsService.findAllComments() -> comments', this.cTokenForLog);
      return comments;
    } catch(error){
      throw ErrorManager.createSignatureError(error.message);
    }
  }

}
