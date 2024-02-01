import { Inject, Injectable } from '@nestjs/common';
import { REQUEST } from '@nestjs/core';
import { DeleteResult, Repository, UpdateResult } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import * as bcrypt from 'bcrypt';
import { IPaginationOptions, Pagination,
  paginate as paginate_ntp } from 'nestjs-typeorm-paginate';
import { PaginateQuery, paginate, Paginated } from 'nestjs-paginate';

import { UsersEntity } from '../entities/users.entity';
import { UserCreateDTO } from '../dto/user.create.dto';
import { UserUpdateDTO } from '../dto/user.update.dto';
import { ErrorManager } from '../../utils/error.manager';
import { IUseToken } from '../../auth/interfaces/auth.interface';
import { useToken } from '../../utils/use.token';
import { USER_STATUS } from '../../constants/user.status';
import { ROLES } from '../../constants/roles';
import { LoggingMessages } from '../../utils/logging.messages';
import {
  USERS_FILTER_CONFIG,
  USERS_FILTER_CONFIG_LOW
} from '../filters/users.filter';
import {
  USERS_SEARCH_CONFIG,
  USERS_SEARCH_CONFIG_LOW
} from '../filters/users.search';
import { VALID_EMAIL_REGEX, VALID_USERNAME_REGEX } from 'src/constants/validations';


@Injectable()
export class UsersService {
  private cTokenForLog: string;

  constructor(
    @Inject(REQUEST) private request: Request,

    @InjectRepository(UsersEntity)
    private readonly userRepository: Repository<UsersEntity>,    
  ) {
    this.cTokenForLog = (
      (process.env.NODE_ENV.trim() != 'production') &&
      (String(process.env.LOGGING_ENABLE) === 'true')
    ) ? request.headers['access_token'] : null;
  }

  public async createUser(
    body: UserCreateDTO
  ): Promise<UsersEntity> {
    try {
      const statusOverride = 'PENDING' as USER_STATUS;
      const roleOverride = 'BASIC' as ROLES;
      const hashedPassword = await bcrypt.hash(
        body.password, 
        Number(process.env.APP_AUTH_HASH_SALT)
      );
      const user: UsersEntity = await this.userRepository.save(
        { ...body,
          status: statusOverride,
          role: roleOverride,
          password: hashedPassword
        }
      );

      if(!user) {
        throw new ErrorManager({
          type: 'BAD_REQUEST',
          message: 'Error while creating the user.'
        });
      }

      LoggingMessages.log(user, 'UsersService.createUser(body) -> user', this.cTokenForLog);
      return user;
    } catch(error){
      throw ErrorManager.createSignatureError(error.message);
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
          message: 'Error while updating the user.'
        });
      }

      LoggingMessages.log(user, 'UsersService.updateUser(body, id) -> user', this.cTokenForLog);
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
          message: 'Error while deleting the user.'
        });
      }

      LoggingMessages.log(user, 'UsersService.deleteUser(id) -> user', this.cTokenForLog);
      return user;
    } catch(error){
      throw ErrorManager.createSignatureError(error.message);
    }
  }

  public async findLoginBy({ key, value }: { key: keyof UserCreateDTO; value: any }) {
    try {
      const user: UsersEntity = await this.userRepository
        .createQueryBuilder('user')
        .addSelect('user.password')
        .where({ [key]: value })
        .getOne();

        LoggingMessages.log(user, 'UsersService.findBy({key, value}) -> user', this.cTokenForLog);
        return user;
    } catch (error) {
      throw ErrorManager.createSignatureError(error.message);
    }
  }

  public async usernameExist(
    username: string
  ): Promise<any> {
    try {
        if(username.match(VALID_USERNAME_REGEX)) {
  
          const response: UsersEntity = await this.userRepository
              .createQueryBuilder('user')
              .select(['user.username'])
              .where("user.username = :userUsername", { userUsername: username })
              .getOne();

          LoggingMessages.log(response, 'UsersService.usernameExist(username) -> response', this.cTokenForLog);
          return response ? true : false;
        }

        return false;
      } catch(error) {
      throw ErrorManager.createSignatureError(error.message);
    }
  }

  public async emailExist(
    email: string
  ): Promise<any> {
    try {
      if(email.match(VALID_EMAIL_REGEX)) {

        const response: UsersEntity = await this.userRepository
            .createQueryBuilder('user')
            .select(['user.email'])
            .where("user.email = :userEmail", { userEmail: email })
            .getOne();

        LoggingMessages.log(response, 'UsersService.emailExist(email) -> response', this.cTokenForLog);
        return response ? true : false;
      }

      return false;
    } catch(error) {
      throw ErrorManager.createSignatureError(error.message);
    }
  }

  public async findIdRoleOnly(
    id: string
  ): Promise<UsersEntity> {
    try {
      const user: UsersEntity = await this.userRepository
          .createQueryBuilder('user')
          .select(['user.id', 'user.role'])
          .where({id})
          .getOne();

      if(!user) {
        throw new ErrorManager({
          type: 'BAD_REQUEST',
          message: 'User not found by Id.'
        });
      }

      LoggingMessages.log(user, 'UsersService.findIdRolOnly(id) -> user', this.cTokenForLog);
      return user;
    } catch(error) {
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
          message: 'User not found.'
        });
      }

      LoggingMessages.log(user, 'UsersService.findOneUser(id) -> user', this.cTokenForLog);
      return user;
    } catch(error) {
      throw ErrorManager.createSignatureError(error.message);
    }
  }

  public async findOwnProfile(request: any): Promise<UsersEntity> {
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
          message: 'Error while loading your user data.'
        });
      }

      LoggingMessages.log(user, 'UsersService.findOwnProfile(request) -> user', this.cTokenForLog);
      return user;
    } catch(error) {
      throw ErrorManager.createSignatureError(error.message);
    }
  }

  public async findAllUsers(
    options: IPaginationOptions 
  ): Promise<Pagination<UsersEntity>> {
    try {
      const queryBuilder = this.userRepository
          .createQueryBuilder('users')
          .orderBy('users.created_at', 'DESC');

      const users = await paginate_ntp<UsersEntity>(queryBuilder, options);

      if(Object.keys(users.items).length === 0) {
        throw new ErrorManager({
          type: 'BAD_REQUEST',
          message: 'No users found.'
        });
      }

      LoggingMessages.log(users, 'UsersService.findAllUsers() -> users', this.cTokenForLog);
      return users;
    } catch(error){
      throw ErrorManager.createSignatureError(error.message);
    }
  }

  public async searchUsers(
    query: PaginateQuery,
    request: any
  ): Promise<Paginated<UsersEntity>> {
    try {
      const currentToken = request.headers['access_token'];
      const manageToken: any = useToken(currentToken); 
      const roleUser = manageToken.role;

      const users = await paginate(
        query,
        this.userRepository,
        (roleUser == ROLES.BASIC ? USERS_SEARCH_CONFIG_LOW : USERS_SEARCH_CONFIG)
      )

      if(Object.keys(users.data).length === 0) {
        throw new ErrorManager({
          type: 'BAD_REQUEST',
          message: 'No users found.'
        });
      }

      LoggingMessages.log(users, 'UsersService.searchUsers() -> users', this.cTokenForLog);
      return users;
    } catch(error){
      throw ErrorManager.createSignatureError(error.message);
    }
  }

  public async filterUsers(
    query: PaginateQuery,
    request: any
  ): Promise<Paginated<UsersEntity>> {
    try {
      const currentToken = request.headers['access_token'];
      const manageToken: any = useToken(currentToken); 
      const roleUser = manageToken.role;

      const users = await paginate(
        query,
        this.userRepository,
        (roleUser == ROLES.BASIC ? USERS_FILTER_CONFIG_LOW : USERS_FILTER_CONFIG)
      )

      if(Object.keys(users.data).length === 0) {
        throw new ErrorManager({
          type: 'BAD_REQUEST',
          message: 'No users found.'
        });
      }

      LoggingMessages.log(users, 'UsersService.filterUsers() -> users', this.cTokenForLog);
      return users;
    } catch(error){
      throw ErrorManager.createSignatureError(error.message);
    }
  }
}
