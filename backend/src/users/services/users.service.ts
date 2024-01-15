import { Injectable } from '@nestjs/common';
import * as bcrypt from 'bcrypt';
import { InjectRepository } from '@nestjs/typeorm';
import { DeleteResult, Repository, UpdateResult } from 'typeorm';
import { UsersEntity } from '../entities/users.entity';
import { UsersPostsEntity } from '../entities/usersPosts.entity';
import { UsersCommentsEntity } from '../entities/usersComments.entity';
import { UserDTO, UserToCommentDTO, UserToPostDTO, UserUpdateDTO } from '../dto/user.dto';
import { ErrorManager } from 'src/utils/error.manager';


@Injectable()
export class UsersService {
  constructor(
    @InjectRepository(UsersEntity)
    private readonly userRepository: Repository<UsersEntity>,

    @InjectRepository(UsersPostsEntity)
    private readonly userPostRepository: Repository<UsersPostsEntity>,

    @InjectRepository(UsersCommentsEntity)
    private readonly userCommentRepository: Repository<UsersCommentsEntity>,
  ) {}

  public async createUser(
    body: UserDTO
  ): Promise<UsersEntity> {
    try{
      /*body.password = await bcrypt.hash(body.password, +process.env.APP_AUTH_HASH_SALT);
      const user: UsersEntity = await this.userRepository.save(body);

      if(!user) {
        throw new ErrorManager({
          type: 'BAD_REQUEST',
          message: 'No se creó el usuario'
        });
      }

      return user;*/
      //body.role = ADMIN;
      body.password = await bcrypt.hash(body.password, +process.env.APP_AUTH_HASH_SALT);
      console.log(body);
      return await this.userRepository.save(body);
    } catch(error){
      throw ErrorManager.createSignatureError(error.message);
    }
  }

  public async relationToPost(
    body: UserToPostDTO
  ): Promise<UserToPostDTO> {
    try{
      return await this.userPostRepository.save(body);
    } catch(error){
      throw ErrorManager.createSignatureError(error.message);
    }
  }

  public async relationToComment(
    body: UserToCommentDTO
  ): Promise<UserToCommentDTO> {
    try{
      return await this.userCommentRepository.save(body);
    } catch(error){
      throw ErrorManager.createSignatureError(error.message);
    }
  }

  public async updateUser(
    body: UserUpdateDTO,
    id: string,
  ): Promise<UpdateResult | undefined>{
    try{
      const user: UpdateResult = await this.userRepository.update(id, body);
      if(user.affected === 0){
        throw new ErrorManager({
          type: 'BAD_REQUEST',
          message: 'No se actualizó el usuario'
        });
      }
      return user;
    } catch(error){
      throw ErrorManager.createSignatureError(error.message);
    }
  }

  public async deleteUser(
    id: string,
  ): Promise<DeleteResult | undefined>{
    try{
      const user: DeleteResult = await this.userRepository.delete(id);
      if(user.affected === 0){
        throw new ErrorManager({
          type: 'BAD_REQUEST',
          message: 'No se eliminó el usuario'
        });
      }
      return user;
    } catch(error){
      throw ErrorManager.createSignatureError(error.message);
    }
  }

  public async findBy({ key, value }: { key: keyof UserDTO; value: any }) {
    try {
      const user: UsersEntity = await this.userRepository
        .createQueryBuilder('user')
        .addSelect('user.password')
        .where({ [key]: value })
        .getOne();

      return user;
    } catch (error) {
      throw ErrorManager.createSignatureError(error.message);
    }
  }

  public async findOneUser(
    id: string
  ): Promise<UsersEntity> {
    try {
      const user: UsersEntity = await this.userRepository
          .createQueryBuilder('user')
          .where({id})
          /*.leftJoinAndSelect('user.postsIncludes', 'postsIncludes')
          .leftJoinAndSelect('postsIncludes.post', 'post')
          .leftJoinAndSelect('user.commentsIncludes', 'commentsIncludes')
          .leftJoinAndSelect('commentsIncludes.post', 'comment')*/
          .getOne();

      if(!user) {
        throw new ErrorManager({
          type: 'BAD_REQUEST',
          message: 'No se encontró el usuario.'
        });
      }
      return user;
    } catch(error) {
      throw ErrorManager.createSignatureError(error.message);
    }
  }

  public async findAllUsers(): Promise<UsersEntity[]> {
    try{
      const users: UsersEntity[] = await this.userRepository.find();
      if(users.length === 0) {
        throw new ErrorManager({
          type: 'BAD_REQUEST',
          message: 'No se encontraron usuarios.'
        });
      }
      return users;
    } catch(error){
      throw ErrorManager.createSignatureError(error.message);
    }
  }
}
