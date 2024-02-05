import { Inject, Injectable } from '@nestjs/common';
import { REQUEST } from '@nestjs/core';
import { DeleteResult, Repository, UpdateResult } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import { PaginateQuery, paginate, Paginated } from 'nestjs-paginate';

import { CommentsEntity } from '../entities/comments.entity';
import { CommentCreateDTO } from '../dto/comment.create.dto';
import { CommentUpdateDTO } from '../dto/comment.update.dto';
import { ErrorManager } from '../../utils/error.manager';
import { UsersService } from '../../users/services/users.service';
import { TypeUserRoleforLogging } from '../../auth/interfaces/auth.interface';
import { LoggingMessages } from '../../utils/logging.messages';
import { COMMENTS_FILTER_CONFIG } from '../filters/comments.filter';
import { COMMENTS_SEARCH_CONFIG } from '../filters/comments.search';
import { COMMENTS_DEFAULT_CONFIG } from '../filters/comments.default';


@Injectable()
export class CommentsService {
  private dataForLog: TypeUserRoleforLogging;

  constructor(
    @Inject(REQUEST) private request: Request,

    @InjectRepository(CommentsEntity)
    private readonly commentRepository: Repository<CommentsEntity>,

    private userService: UsersService
  ) {
    this.dataForLog = this.userService.getUserRoleforLogging(this.request);
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

      LoggingMessages.log(comment, 'CommentsService.createComment(body) -> comment', this.dataForLog);
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

      LoggingMessages.log(comment, 'CommentsService.updateComment(body, id) -> comment', this.dataForLog);
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

      LoggingMessages.log(comment, 'CommentsService.deleteComment(id) -> comment', this.dataForLog);
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
          //.leftJoinAndSelect('comment.author', 'author')
          //.leftJoinAndSelect('comment.post', 'post')
          .leftJoin('comment.author', 'author')
          .addSelect([
            'author.id', 'author.updateAt', 'author.username', 'author.email',
            'author.status', 'author.role', 'author.karma', 'author.avatar',
            'author.firstName', 'author.lastName', 'author.age', 'author.city',
            'author.country'
          ])
          .leftJoin('comment.post', 'post')
          .addSelect([
            'post.id', 'post.title', 'post.description', 'post.updateAt'
          ])
          .where(this.userService.onlyPublished('post', this.request))
          .orderBy('comment.updateAt', 'DESC')
          .getOne();

      if(!comment) {
        throw new ErrorManager({
          type: 'BAD_REQUEST',
          message: 'Comment not found.'
        });
      }

      LoggingMessages.log(comment, 'CommentsService.findOneComment(id) -> comment', this.dataForLog);
      return comment;
    } catch(error){
      throw ErrorManager.createSignatureError(error.message);
    }
  }

  public async findAllComments(
    query: PaginateQuery
  ): Promise<Paginated<CommentsEntity>> {
    try {
      const queryBuilder = this.commentRepository
          .createQueryBuilder('comments')
          //.leftJoinAndSelect('comments.author', 'author')
          //.leftJoinAndSelect('comments.post', 'post')
          .leftJoin('comments.author', 'author')
          .addSelect([
            'author.id', 'author.updateAt', 'author.username', 'author.email',
            'author.status', 'author.role', 'author.karma', 'author.avatar',
            'author.firstName', 'author.lastName', 'author.age', 'author.city',
            'author.country'
          ])
          .leftJoin('comments.post', 'post')
          .addSelect([
            'post.id', 'post.title', 'post.description', 'post.updateAt'
          ])
          .where(this.userService.onlyPublished('post', this.request));

      const comments = await paginate(
        query,
        queryBuilder,
        COMMENTS_DEFAULT_CONFIG
      )

      if(Object.keys(comments.data).length === 0) {
        throw new ErrorManager({
          type: 'BAD_REQUEST',
          message: 'Comment not found.'
        });
      }

      LoggingMessages.log(comments, 'CommentsService.findAllComments() -> comments', this.dataForLog);
      return comments;
    } catch(error){
      throw ErrorManager.createSignatureError(error.message);
    }
  }

  public async searchComments(
    query: PaginateQuery
  ): Promise<Paginated<CommentsEntity>> {
    try {
      const queryBuilder = this.commentRepository
          .createQueryBuilder('comments')
          .leftJoinAndSelect('comments.author', 'author')
          .leftJoinAndSelect('comments.post', 'post');

      const comments = await paginate(
        query,
        queryBuilder,
        COMMENTS_SEARCH_CONFIG
      )

      if(Object.keys(comments.data).length === 0) {
        throw new ErrorManager({
          type: 'BAD_REQUEST',
          message: 'No comments found.'
        });
      }

      LoggingMessages.log(comments, 'CommentsService.searchComments() -> comments', this.dataForLog);
      return comments;
    } catch(error){
      throw ErrorManager.createSignatureError(error.message);
    }
  }

  public async filterComments(
    query: PaginateQuery
  ): Promise<Paginated<CommentsEntity>> {
    try {
      const queryBuilder = this.commentRepository
          .createQueryBuilder('comments')
          .leftJoinAndSelect('comments.author', 'author')
          .leftJoinAndSelect('comments.post', 'post');

      const comments = await paginate(
        query,
        queryBuilder,
        COMMENTS_FILTER_CONFIG
      )

      if(Object.keys(comments.data).length === 0) {
        throw new ErrorManager({
          type: 'BAD_REQUEST',
          message: 'No comments found.'
        });
      }

      LoggingMessages.log(comments, 'CommentsService.filterComments() -> comments', this.dataForLog);
      return comments;
    } catch(error){
      throw ErrorManager.createSignatureError(error.message);
    }
  }

}
