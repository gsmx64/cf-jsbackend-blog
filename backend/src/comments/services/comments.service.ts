import { Inject, Injectable } from '@nestjs/common';
import { REQUEST } from '@nestjs/core';
import { DeleteResult, Repository, UpdateResult } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import { IPaginationOptions, Pagination,
  paginate as paginate_ntp } from 'nestjs-typeorm-paginate';
import { PaginateQuery, paginate, Paginated } from 'nestjs-paginate';

import { CommentsEntity } from '../entities/comments.entity';
import { CommentCreateDTO } from '../dto/comment.create.dto';
import { CommentUpdateDTO } from '../dto/comment.update.dto';
import { ErrorManager } from '../../utils/error.manager';
import { LoggingMessages } from '../../utils/logging.messages';
import { COMMENTS_FILTER_CONFIG } from '../filters/comments.filter';
import { COMMENTS_SEARCH_CONFIG } from '../filters/comments.search';

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
    body: CommentCreateDTO
  ): Promise<CommentsEntity> {
    try{
      const comment: CommentsEntity = await this.commentRepository.save(body);

      if(!comment) {
        throw new ErrorManager({
          type: 'BAD_REQUEST',
          message: 'Error while creating the comment.'
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
          message: 'Error while updating the comment.'
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
          message: 'Error while deleting the comment.'
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
          message: 'Comment not found.'
        });
      }

      LoggingMessages.log(comment, 'CommentsService.findOneComment(id) -> comment', this.cTokenForLog);
      return comment;
    } catch(error){
      throw ErrorManager.createSignatureError(error.message);
    }
  }

  public async findAllComments(
    options: IPaginationOptions 
  ): Promise<Pagination<CommentsEntity>> {
    try {
      const queryBuilder = this.commentRepository
          .createQueryBuilder('comments')
          .orderBy('comments.created_at', 'DESC');

      const comments = await paginate_ntp<CommentsEntity>(queryBuilder, options);

      if(Object.keys(comments.items).length === 0) {
        throw new ErrorManager({
          type: 'BAD_REQUEST',
          message: 'No comments found.'
        });
      }

      LoggingMessages.log(comments, 'CommentsService.findAllComments() -> comments', this.cTokenForLog);
      return comments;
    } catch(error){
      throw ErrorManager.createSignatureError(error.message);
    }
  }

  public async searchComments(
    query: PaginateQuery
  ): Promise<Paginated<CommentsEntity>> {
    try {

      const comments = await paginate(
        query,
        this.commentRepository,
        COMMENTS_SEARCH_CONFIG
      )

      if(Object.keys(comments.data).length === 0) {
        throw new ErrorManager({
          type: 'BAD_REQUEST',
          message: 'No comments found.'
        });
      }

      LoggingMessages.log(comments, 'CommentsService.searchComments() -> comments', this.cTokenForLog);
      return comments;
    } catch(error){
      throw ErrorManager.createSignatureError(error.message);
    }
  }

  public async filterComments(
    query: PaginateQuery
  ): Promise<Paginated<CommentsEntity>> {
    try {
      const comments = await paginate(
        query,
        this.commentRepository,
        COMMENTS_FILTER_CONFIG
      )

      if(Object.keys(comments.data).length === 0) {
        throw new ErrorManager({
          type: 'BAD_REQUEST',
          message: 'No comments found.'
        });
      }

      LoggingMessages.log(comments, 'CommentsService.filterComments() -> comments', this.cTokenForLog);
      return comments;
    } catch(error){
      throw ErrorManager.createSignatureError(error.message);
    }
  }

}
