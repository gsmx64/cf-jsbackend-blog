import { Inject, Injectable } from '@nestjs/common';
import { REQUEST } from '@nestjs/core';
import { InjectRepository } from '@nestjs/typeorm';
import { DeleteResult, Repository, UpdateResult } from 'typeorm';
import * as bcrypt from 'bcrypt';

import { UsersEntity } from '../entities/users.entity';
import { UserDTO } from '../dto/user.dto';
import { UserUpdateDTO } from '../dto/user.update.dto';
import { ErrorManager } from '../../utils/error.manager';
import { IUseToken } from '../../auth/interfaces/auth.interface';
import { useToken } from '../../utils/use.token';


@Injectable()
export class UsersService {
  constructor(
    @Inject(REQUEST) private request: Request,

    @InjectRepository(UsersEntity)
    private readonly userRepository: Repository<UsersEntity>,
  ) {}

  public async createUser(
    body: UserDTO
  ): Promise<UsersEntity> {
    try {
        const hashedPassword = await bcrypt.hash(body.password, Number(process.env.APP_AUTH_HASH_SALT));        
        const savedUser: UsersEntity = await this.userRepository.save({ ...body, password: hashedPassword });
        console.log(body);
      return savedUser;
    } catch(error){
      throw ErrorManager.createSignatureError(error.toString());//.message+' 999'
    }
  }

  public async updateUser(
    body: UserUpdateDTO,
    id: string,
  ): Promise<UpdateResult | undefined>{
    try {
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
    try {
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
          .leftJoinAndSelect('user.posts', 'posts')
          .leftJoinAndSelect('posts.author', 'author')
          .leftJoinAndSelect('user.comments', 'comments')
          .leftJoinAndSelect('comments.author', 'authorcom')
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

  public async findOwnProfile(request: any): Promise<any> {
    const currentToken = request.headers['access_token'];
    const manageToken: IUseToken | string = useToken(currentToken); 
    const id = manageToken.sub;

    try {      
      const user: UsersEntity = await this.userRepository
          .createQueryBuilder('user')
          .where({id})
          .leftJoinAndSelect('user.posts', 'posts')
          .leftJoinAndSelect('posts.author', 'author_users')
          .leftJoinAndSelect('user.comments', 'comments')
          .leftJoinAndSelect('comments.author', 'author_comments')
          .getOne();

      if(!user) {
        throw new ErrorManager({
          type: 'BAD_REQUEST',
          message: 'No se encontró el usuario.'
        });
      }
      return user;
    } catch(error) {
      throw ErrorManager.createSignatureError(error.message+' ID: '+currentToken);
    }
  }

  public async findAllUsers(): Promise<UsersEntity[]> {
    try {
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
