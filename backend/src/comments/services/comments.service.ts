import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { DeleteResult, Repository, UpdateResult } from 'typeorm';
import { CommentsEntity } from '../entities/comments.entity';
import { CommentDTO, CommentUpdateDTO } from '../dto/comment.dto';
import { ErrorManager } from 'src/utils/error.manager';

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
      const comment: CommentsEntity = await this.commentRepository.save(body);
      if(!comment) {
        throw new ErrorManager({
          type: 'BAD_REQUEST',
          message: 'No se creó el comentario'
        });
      }
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
                                            .getOne();
      if(!comment) {
        throw new ErrorManager({
          type: 'BAD_REQUEST',
          message: 'No se encontró el comentario'
        });
      }
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
      return comments;
    } catch(error){
      throw ErrorManager.createSignatureError(error.message);
    }
  }

}
