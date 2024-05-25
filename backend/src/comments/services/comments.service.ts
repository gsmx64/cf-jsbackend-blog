/**
 * Service responsible for handling comments operations.
 */
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
import { AuthService } from 'src/auth/services/auth.service';


/**
 * Service class for handling comments operations.
 */
@Injectable()
export class CommentsService {
  private dataForLog: TypeUserRoleforLogging;

  constructor(
    @Inject(REQUEST) private request: Request,

    @InjectRepository(CommentsEntity)
    private readonly commentRepository: Repository<CommentsEntity>,

    private authService: AuthService,
    private userService: UsersService
  ) {
    this.dataForLog = this.userService.getUserRoleforLogging(this.request);
  }

  /**
   * Creates a new comment.
   * @param body - The data for the comment to be created.
   * @returns A promise that resolves to the created comment.
   * @throws An error if there was an issue creating the comment.
   */
  public async createComment(
    body: CommentCreateDTO
  ): Promise<CommentsEntity> {
    try{
      const authorOverride = this.authService.getUserId(this.request);

      body = { ...body,
        author: await authorOverride,
      }

      const comment: CommentsEntity = await this.commentRepository.save(body);

      if(!comment) {
        throw new ErrorManager({
          type: 'NO_CONTENT',
          message: 'Error while creating the comment.'
        });
      }

      LoggingMessages.log(comment, 'CommentsService.createComment(body) -> comment', this.dataForLog);
      return comment;
    } catch(error){
      throw ErrorManager.createSignatureError(error.message);
    }
  }

  /**
   * Updates a comment.
   * @param body - The updated comment data.
   * @param id - The ID of the comment to update.
   * @returns The update result.
   */
  public async updateComment(
    body: CommentUpdateDTO,
    id: string,
  ): Promise<UpdateResult | undefined>{
    try{
      const comment: UpdateResult = await this.commentRepository.update(id, body);

      if(comment.affected === 0){
        throw new ErrorManager({
          type: 'NO_CONTENT',
          message: 'No changes made while updating the comment.'
        });
      }

      LoggingMessages.log(comment, 'CommentsService.updateComment(body, id) -> comment', this.dataForLog);
      return comment;
    } catch(error){
      throw ErrorManager.createSignatureError(error.message);
    }
  }

  /**
   * Deletes a comment.
   * @param id - The ID of the comment to delete.
   * @returns The delete result.
   */
  public async deleteComment(
    id: string,
  ): Promise<DeleteResult | undefined>{
    try{
      const comment: DeleteResult = await this.commentRepository.delete(id);

      if(comment.affected === 0){
        throw new ErrorManager({
          type: 'NO_CONTENT',
          message: 'Error while deleting the comment.'
        });
      }

      LoggingMessages.log(comment, 'CommentsService.deleteComment(id) -> comment', this.dataForLog);
      return comment;
    } catch(error){
      throw ErrorManager.createSignatureError(error.message);
    }
  }

  /**
   * Finds a comment by ID.
   * @param id - The ID of the comment to find.
   * @returns The found comment.
   */
  public async findOneComment(
    id: string
  ): Promise<CommentsEntity> {
    try{
      const comment: CommentsEntity = await this.commentRepository
          .createQueryBuilder('comment')
          .where({id})
          .leftJoin('comment.author', 'author')
          .addSelect([
            'author.id', 'author.updateAt', 'author.username', 'author.email',
            'author.status', 'author.role', 'author.karma', 'author.avatar',
            'author.firstName', 'author.lastName', 'author.age', 'author.city',
            'author.country'
          ])
          .leftJoin('comment.post', 'post', this.userService.onlyPublished('post', this.request))
          .addSelect([
            'post.id', 'post.title', 'post.description', 'post.updateAt'
          ])
          .orderBy('comment.updateAt', 'DESC')
          .getOne();

      if(!comment) {
        throw new ErrorManager({
          type: 'NO_CONTENT',
          message: 'Comment not found.'
        });
      }

      LoggingMessages.log(comment, 'CommentsService.findOneComment(id) -> comment', this.dataForLog);
      return comment;
    } catch(error){
      throw ErrorManager.createSignatureError(error.message);
    }
  }

  /**
   * Finds comments by user.
   * @param id - The ID of the user.
   * @param query - The pagination query.
   * @returns A promise that resolves to a paginated list of comments.
   * @throws An error if comments are not found for the user.
   */
  public async findCommentsByUser(
    id: string,
    query: PaginateQuery
  ): Promise<Paginated<CommentsEntity>> {
    try {
      const queryBuilder = this.commentRepository
          .createQueryBuilder('comments')
          .where('comments.author = :userId', { userId: id })
          .leftJoin('comments.post', 'post', this.userService.onlyPublished('post', this.request))
          .addSelect([
            'post.id', 'post.title', 'post.description', 'post.updateAt'
          ]);

      const comments = await paginate(
        query,
        queryBuilder,
        COMMENTS_DEFAULT_CONFIG
      )

      if(Object.keys(comments.data).length === 0) {
        throw new ErrorManager({
          type: 'NO_CONTENT',
          message: 'Comments not found for this user.'
        });
      }

      LoggingMessages.log(comments, 'CommentsService.findCommentsByUser() -> comments', this.dataForLog);
      return comments;
    } catch(error){
      throw ErrorManager.createSignatureError(error.message);
    }
  }

  /**
   * Finds all comments.
   * @param query - The pagination query.
   * @returns The paginated list of comments.
   */
  public async findAllComments(
    query: PaginateQuery
  ): Promise<Paginated<CommentsEntity>> {
    try {
      const queryBuilder = this.commentRepository
          .createQueryBuilder('comments')
          .leftJoin('comments.author', 'author')
          .addSelect([
            'author.id', 'author.updateAt', 'author.username', 'author.email',
            'author.status', 'author.role', 'author.karma', 'author.avatar',
            'author.firstName', 'author.lastName', 'author.age', 'author.city',
            'author.country'
          ])
          .leftJoin('comments.post', 'post', this.userService.onlyPublished('post', this.request))
          .addSelect([
            'post.id', 'post.title', 'post.description', 'post.updateAt'
          ]);

      const comments = await paginate(
        query,
        queryBuilder,
        COMMENTS_DEFAULT_CONFIG
      )

      if(Object.keys(comments.data).length === 0) {
        throw new ErrorManager({
          type: 'NO_CONTENT',
          message: 'Comment not found.'
        });
      }

      LoggingMessages.log(comments, 'CommentsService.findAllComments() -> comments', this.dataForLog);
      return comments;
    } catch(error){
      throw ErrorManager.createSignatureError(error.message);
    }
  }

  /**
   * Searches for comments based on the provided query parameters.
   * @param query - The query parameters for pagination.
   * @returns A promise that resolves to a paginated list of comments.
   * @throws An error if no comments are found.
   */
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
          type: 'NO_CONTENT',
          message: 'Comments not found.'
        });
      }

      LoggingMessages.log(comments, 'CommentsService.searchComments() -> comments', this.dataForLog);
      return comments;
    } catch(error){
      throw ErrorManager.createSignatureError(error.message);
    }
  }

  /**
   * Filters for comments based on the provided query parameters.
   * @param query - The query parameters for pagination.
   * @returns A promise that resolves to a paginated list of comments.
   * @throws An error if no comments are found.
   */
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
          type: 'NO_CONTENT',
          message: 'Comments not found.'
        });
      }

      LoggingMessages.log(comments, 'CommentsService.filterComments() -> comments', this.dataForLog);
      return comments;
    } catch(error){
      throw ErrorManager.createSignatureError(error.message);
    }
  }

}
