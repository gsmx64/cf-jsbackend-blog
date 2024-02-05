import { Inject, Injectable } from '@nestjs/common';
import { REQUEST } from '@nestjs/core';
import { DeleteResult, Repository, UpdateResult } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import * as bcrypt from 'bcrypt';
import { PaginateQuery, paginate, Paginated } from 'nestjs-paginate';

import { UsersEntity } from '../entities/users.entity';
import { UserCreateDTO } from '../dto/user.create.dto';
import { UserUpdateDTO } from '../dto/user.update.dto';
import { ErrorManager } from '../../utils/error.manager';
import { IUseToken, TypeUserRoleforLogging } from '../../auth/interfaces/auth.interface';
import { useToken } from '../../utils/use.token';
import { USER_STATUS } from '../../constants/user.status';
import { ROLES } from '../../constants/roles';
import { PUBLISH_STATUS } from '../../constants/publish.status'
import { VALID_EMAIL_REGEX, VALID_USERNAME_REGEX } from '../../constants/validations';
import { LoggingMessages } from '../../utils/logging.messages';
import {
  USERS_FILTER_CONFIG,
  USERS_FILTER_CONFIG_LOW } from '../filters/users.filter';
import {
  USERS_SEARCH_CONFIG,
  USERS_SEARCH_CONFIG_LOW } from '../filters/users.search';
import {
  USERS_DEFAULT_CONFIG,
  USERS_DEFAULT_CONFIG_LOW } from '../filters/users.default';
import { CommentsEntity } from 'src/comments/entities/comments.entity';


@Injectable()
export class UsersService {
  private dataForLog: TypeUserRoleforLogging;

  constructor(
    @Inject(REQUEST) private request: Request,

    @InjectRepository(UsersEntity)
    private readonly userRepository: Repository<UsersEntity>,    
  ) {
    this.dataForLog = this.getUserRoleforLogging(this.request);
  }

  public onlyPublished(alias: string = 'posts', request: any) {
    try {
      const currentToken = request.headers['access_token'];
      const manageToken: any = useToken(currentToken);
      const currentUserRole = manageToken.role;

      return (
        ( currentUserRole == ROLES.ADMIN ||
          currentUserRole == ROLES.MODERATOR ||
          currentUserRole == ROLES.EDITOR
        ) ? `${alias}.description != 'fake-query'`
        : `${alias}.status = '${PUBLISH_STATUS.PUBLISHED}'`);
    } catch(error) {
      throw ErrorManager.createSignatureError(error.message);
    }
  }

  public onlyEnabledUsers(request: any) {
    try {
      const currentToken = request.headers['access_token'];
      const manageToken: any = useToken(currentToken);
      const currentUserRole = manageToken.role;
      console.log(currentToken);
      console.log(`Current User Role: ${currentUserRole}`);

      return (
        ( currentUserRole == ROLES.ADMIN ||
          currentUserRole == ROLES.MODERATOR ||
          currentUserRole == ROLES.EDITOR
        ) ? `users.lastName != 'fake-query'`
        : `users.status = '${USER_STATUS.ENABLED}'`);
    } catch(error) {
      throw ErrorManager.createSignatureError(error.message);
    }
  }

  public isRoleBasic(request: any) {
    try {
      const currentToken = request.headers['access_token'];
      const manageToken: any = useToken(currentToken);
      return (manageToken.role == ROLES.BASIC);
    } catch(error) {
      throw ErrorManager.createSignatureError(error.message);
    }
  }

  public getUserRoleforLogging(request: any) {
    try {
      const currentToken = request.headers['access_token'];
      const manageToken: any = useToken(currentToken);

      const user: string = (
        manageToken != null
      ) || (manageToken != undefined) ? manageToken.sub : 'Undefined';

      const role: string = (
        manageToken != null
      ) || (manageToken != undefined) ? manageToken.role : 'Undefined';

      return { user, role }
    } catch(error) {
      throw ErrorManager.createSignatureError(error.message);
    }
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

      LoggingMessages.log(user, 'UsersService.createUser(body) -> user', this.dataForLog);
      return user;
    } catch(error){
      throw ErrorManager.createSignatureError(error.message);
    }
  }

  public async updateUser(
    body: UserUpdateDTO,
    id: string,
    request: any
  ): Promise<UpdateResult | undefined>{
    try {
      const currentToken = request.headers['access_token'];
      const manageToken: any = useToken(currentToken); 
      const currentUserId = manageToken.sub;
      const currentUserRole = manageToken.role;
      
      const user: UpdateResult = ( currentUserRole == ROLES.ADMIN) ?
        await this.userRepository.update(id, body) :
        await this.userRepository.update(currentUserId, body);

      if(user.affected === 0){
        throw new ErrorManager({
          type: 'BAD_REQUEST',
          message: 'Error while updating the user.'
        });
      }

      LoggingMessages.log(user, 'UsersService.updateUser(body, id) -> user', this.dataForLog);
      return user;
    } catch(error){
      throw ErrorManager.createSignatureError(error.message);
    }
  }

  public async deleteUser(
    id: string
  ): Promise<DeleteResult | undefined>{
    try {      
      const user: DeleteResult = await this.userRepository.delete(id);

      if(user.affected === 0){
        throw new ErrorManager({
          type: 'BAD_REQUEST',
          message: 'Error while deleting the user.'
        });
      }

      LoggingMessages.log(user, 'UsersService.deleteUser(id) -> user', this.dataForLog);
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

        LoggingMessages.log(user, 'UsersService.findLoginBy({key, value}) -> user', this.dataForLog);
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

          LoggingMessages.log(response, 'UsersService.usernameExist(username) -> response', this.dataForLog);
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

        LoggingMessages.log(response, 'UsersService.emailExist(email) -> response', this.dataForLog);
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

      LoggingMessages.log(user, 'UsersService.findIdRoleOnly(id) -> user', this.dataForLog);
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
          //.leftJoinAndSelect('user.posts', 'posts')
          //.leftJoinAndSelect('user.comments', 'comments')
          .leftJoin('user.posts', 'posts')
          .addSelect([
            'posts.id', 'posts.updateAt', 'posts.title',
            'posts.description', 'posts.status', 'posts.category'
          ])
          .where(this.onlyPublished('posts', this.request))
          .leftJoin('posts.category', 'posts_category')
          .addSelect([
            'posts_category.id', 'posts_category.updateAt', 'posts_category.title',
            'posts_category.description', 'posts_category.status'
          ])
          .where(this.onlyPublished('posts_category', this.request))
          .leftJoin('user.comments', 'comments')
          .addSelect([
            'comments.id', 'comments.message', 'comments.post'
          ])
          .leftJoin('comments.post', 'comments_post')
          .addSelect([
            'comments_post.id', 'comments_post.title', 'comments_post.updateAt'
          ])
          .orderBy('user.created_at', 'DESC')
          .getOne();

      if(!user) {
        throw new ErrorManager({
          type: 'BAD_REQUEST',
          message: 'User not found.'
        });
      }

      LoggingMessages.log(user, 'UsersService.findOneUser(id) -> user', this.dataForLog);
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
          //.leftJoinAndSelect('user.posts', 'posts')
          //.leftJoinAndSelect('user.comments', 'comments')
          .leftJoin('user.posts', 'posts')
          .addSelect([
            'posts.id', 'posts.updateAt', 'posts.title',
            'posts.description', 'posts.status', 'posts.category'
          ])
          .where(this.onlyPublished('posts', this.request))
          .leftJoin('posts.category', 'posts_category')
          .addSelect([
            'posts_category.id', 'posts_category.updateAt', 'posts_category.title',
            'posts_category.description', 'posts_category.status'
          ])
          .where(this.onlyPublished('posts_category', this.request))
          .leftJoin('user.comments', 'comments')
          .addSelect([
            'comments.id', 'comments.message', 'comments.post'
          ])
          .leftJoin('comments.post', 'comments_post')
          .addSelect([
            'comments_post.id', 'comments_post.title', 'comments_post.updateAt'
          ])
          .orderBy('user.created_at', 'DESC')
          .getOne();

      if(!user) {
        throw new ErrorManager({
          type: 'BAD_REQUEST',
          message: 'Error while loading your user data.'
        });
      }

      LoggingMessages.log(user, 'UsersService.findOwnProfile(request) -> user', this.dataForLog);
      return user;
    } catch(error) {
      throw ErrorManager.createSignatureError(error.message);
    }
  }

  public async findAllUsers(
    query: PaginateQuery
  ): Promise<Paginated<UsersEntity>> {
    try {
      const queryBuilder = this.userRepository
          .createQueryBuilder('users')
          .where(this.onlyEnabledUsers(this.request))
          //.leftJoinAndSelect('users.posts', 'posts')
          //.leftJoinAndSelect('posts.author', 'author_users')
          //.leftJoinAndSelect('posts.category', 'category_posts')
          //.leftJoinAndSelect('users.comments', 'comments')
          //.leftJoinAndSelect('comments.post', 'comments_post');
          .leftJoin('users.posts', 'posts')
          .addSelect([
            'posts.id', 'posts.updateAt', 'posts.title',
            'posts.description', 'posts.status', 'posts.category'
          ])
          .where(this.onlyPublished('posts', this.request))
          .leftJoin('posts.category', 'posts_category')
          .addSelect([
            'posts_category.id', 'posts_category.updateAt', 'posts_category.title',
            'posts_category.description', 'posts_category.status'
          ])
          .where(this.onlyPublished('posts_category', this.request))
          .leftJoin('users.comments', 'comments')
          .addSelect([
            'comments.id', 'comments.message', 'comments.post'
          ])
          .leftJoin('comments.post', 'comments_post')
          .addSelect([
            'comments_post.id', 'comments_post.title', 'comments_post.updateAt'
          ]);

      const users = await paginate(
        query,
        queryBuilder,
        (
          this.isRoleBasic(this.request) ?
          USERS_DEFAULT_CONFIG_LOW
          : USERS_DEFAULT_CONFIG
        )
      )

      if(Object.keys(users.data).length === 0) {
        throw new ErrorManager({
          type: 'BAD_REQUEST',
          message: 'Users not found.'
        });
      }

      LoggingMessages.log(users, 'UsersService.findAllUsers() -> users', this.dataForLog);
      return users;
    } catch(error){
      throw ErrorManager.createSignatureError(error.message);
    }
  }

  public async searchUsers(
    query: PaginateQuery
  ): Promise<Paginated<UsersEntity>> {
    try {
      const users = await paginate(
        query,
        this.userRepository,
        (this.isRoleBasic(this.request) ? USERS_SEARCH_CONFIG_LOW : USERS_SEARCH_CONFIG)
      )

      if(Object.keys(users.data).length === 0) {
        throw new ErrorManager({
          type: 'BAD_REQUEST',
          message: 'No users found.'
        });
      }

      LoggingMessages.log(users, 'UsersService.searchUsers() -> users', this.dataForLog);
      return users;
    } catch(error){
      throw ErrorManager.createSignatureError(error.message);
    }
  }

  public async filterUsers(
    query: PaginateQuery
  ): Promise<Paginated<UsersEntity>> {
    try {
      const users = await paginate(
        query,
        this.userRepository,
        (this.isRoleBasic(this.request) ? USERS_FILTER_CONFIG_LOW : USERS_FILTER_CONFIG)
      )

      if(Object.keys(users.data).length === 0) {
        throw new ErrorManager({
          type: 'BAD_REQUEST',
          message: 'No users found.'
        });
      }

      LoggingMessages.log(users, 'UsersService.filterUsers() -> users', this.dataForLog);
      return users;
    } catch(error){
      throw ErrorManager.createSignatureError(error.message);
    }
  }
}
