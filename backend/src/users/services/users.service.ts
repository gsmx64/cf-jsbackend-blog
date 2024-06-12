/**
 * Service responsible for handling users operations.
 */
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
import { PUBLISH_STATUS } from '../../constants/publish.status';
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
import { IUserPassword } from '../interfaces/user.interface';


/**
 * Service class for handling users operations.
 */
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

  /**
   * Filters the query based on the user's role and returns the appropriate condition.
   * If the user is an admin, moderator, or editor, the condition will be a fake query.
   * Otherwise, the condition will return only published posts, categories or comments.
   * @param alias - The alias for the posts table.
   * @param request - The request object containing the headers.
   * @returns The condition based on the user's role.
   * @throws {Error} If there is an error while processing the request.
   */
  public onlyPublished(alias: string = 'posts', request: any) {
    try {
      const currentToken = request.headers['access_token'];
      const manageToken: any = useToken(currentToken);
      const currentUserRole = manageToken.role;

      return (
        (this.isRoleBasic(request)) ?
        `${alias}.status = '${PUBLISH_STATUS.PUBLISHED}'` :
        `${alias}.description != 'fake-query'`
      );
    } catch(error) {
      throw ErrorManager.createSignatureError(error.message);
    }
  }

  /**
   * Retrieves the condition to filter users based on their status and the role of the current user.
   * If the current user has the role of ADMIN, MODERATOR, or EDITOR, the condition will be a fake query.
   * Otherwise, the condition will return users with enabled status.
   * @param request - The request object containing the headers.
   * @returns The condition to filter users.
   * @throws {Error} If there is an error while retrieving the condition.
   */
  public onlyEnabledUsers(request: any) {
    try {
      return (
        ( this.isRoleBasic(request)) ?
        `users.status = '${USER_STATUS.ENABLED}'` :
        `users.lastName != 'fake-query'`
      );
    } catch(error) {
      throw ErrorManager.createSignatureError(error.message);
    }
  }

  /**
   * Checks if the user role is basic.
   * @param request - The request object containing the headers.
   * @returns True if the user role is basic, false otherwise.
   * @throws {Error} If there is an error while checking the user role.
   */
  public isRoleBasic(request: any) {
    try {
      const currentToken = request.headers['access_token'];
      const manageToken: any = useToken(currentToken);
      return (request.headers['access_token'] == '')
        ? true
        : (manageToken.role == ROLES.BASIC);
    } catch(error) {
      throw ErrorManager.createSignatureError(error.message);
    }
  }

  /**
   * Retrieves the user and role information for logging purposes.
   * @param request - The request object containing the headers.
   * @returns An object containing the user and role information.
   * @throws {Error} If there is an error retrieving the user and role information.
   */
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

  /**
   * Creates a new user.
   * @param body - The user data to be created.
   * @returns A promise that resolves to the created user.
   * @throws An error if there is an issue creating the user.
   */
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
          karma: body.karma ? body.karma : 0,
          password: hashedPassword
        }
      );

      if(!user) {
        throw new ErrorManager({
          type: 'NO_CONTENT',
          message: 'Error while creating the user.'
        });
      }

      LoggingMessages.log(user, 'UsersService.createUser(body) -> user', this.dataForLog);
      return user;
    } catch(error){
      throw ErrorManager.createSignatureError(error.message);
    }
  }

  /**
   * Updates a user.
   * @param body - The updated user data.
   * @param id - The ID of the user to update.
   * @param request - The request object.
   * @returns The update result.
   */
  public async updateUser(
    body: UserUpdateDTO,
    id: string,
    request: any
  ): Promise<UpdateResult | undefined>{
    try {
      /*const currentToken = request.headers['access_token'];
      const manageToken: any = useToken(currentToken); 
      const currentUserId = manageToken.sub;
      const currentUserRole = manageToken.role;*/
      const hashedPassword = (body?.password != undefined) ? await bcrypt.hash(
        body?.password, 
        Number(process.env.APP_AUTH_HASH_SALT)
      ) : '';
      
      const user: UpdateResult = (body?.password != undefined) ? 
      await this.userRepository.update(id,
        { ...body, password: hashedPassword }
      ) : await this.userRepository.update(id, body);

      if(user.affected === 0){
        throw new ErrorManager({
          type: 'NO_CONTENT',
          message: 'No changes made while updating the user.'
        });
      }

      LoggingMessages.log(user, 'UsersService.updateUser(body, id) -> user', this.dataForLog);
      return user;
    } catch(error){
      throw ErrorManager.createSignatureError(error.message);
    }
  }

  /**
   * Updates the user's password.
   * @param body - The updated user password.
   * @param id - The ID of the user to update password.
   * @param request - The request object.
   * @returns The update result.
   */
  public async updateUserPassword(
    body: IUserPassword,
    id: string,
    request: any
  ): Promise<UpdateResult | undefined>{
    try {
      const userExists = await this.findPasswordById(id);
      if (!userExists) {
        throw new ErrorManager({
          type: 'NO_CONTENT',
          message: 'User not found!',
        });
      }

      const isCurrentPasswordCorrect = await bcrypt.compare(
        body.current_password,
        userExists.password
      );

      if (!isCurrentPasswordCorrect) {
        throw new ErrorManager({
          type: 'UNAUTHORIZED',
          message: 'Incorrect current password.',
        });
      }

      const hashedPassword = await bcrypt.hash(
        body.password, 
        Number(process.env.APP_AUTH_HASH_SALT)
      );

      const user: UpdateResult = await this.userRepository.update(id,
        { password: hashedPassword }
      );

      if(user.affected === 0){
        throw new ErrorManager({
          type: 'NO_CONTENT',
          message: 'No changes made while updating the user.'
        });
      }

      LoggingMessages.log(user, 'UsersService.updateUser(body, id) -> user', this.dataForLog);
      return user;
    } catch(error){
      throw ErrorManager.createSignatureError(error.message);
    }
  }

  /**
   * Deletes a user.
   * @param id - The ID of the user to delete.
   * @returns The delete result.
   */
  public async deleteUser(
    id: string
  ): Promise<DeleteResult | undefined>{
    try {      
      const user: DeleteResult = await this.userRepository.delete(id);

      if(user.affected === 0){
        throw new ErrorManager({
          type: 'NO_CONTENT',
          message: 'Error while deleting the user.'
        });
      }

      LoggingMessages.log(user, 'UsersService.deleteUser(id) -> user', this.dataForLog);
      return user;
    } catch(error){
      throw ErrorManager.createSignatureError(error.message);
    }
  }

  /**
   * Finds a user by a specified key-value pair.
   * @param key - The key to search for (e.g., 'username', 'email').
   * @param value - The value to match against the specified key.
   * @returns The user object if found, otherwise null.
   * @throws Error if an error occurs during the search.
   */
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

  /**
   * Finds a user by a specified key-value pair.
   * @param key - The key to search for (e.g., 'username', 'email').
   * @param value - The value to match against the specified key.
   * @returns The user object if found, otherwise null.
   * @throws Error if an error occurs during the search.
   */
  private async findPasswordById(id: string) {
    try {
      const user: UsersEntity = await this.userRepository
        .createQueryBuilder('user')
        .select(['user.password'])
        .where({id})
        .getOne();

        LoggingMessages.log(user, 'UsersService.findPasswordById(id) -> user', this.dataForLog);
        return user;
    } catch (error) {
      throw ErrorManager.createSignatureError(error.message);
    }
  }

  /**
   * Checks if a username exists in the database.
   * @param username - The username to check.
   * @returns A Promise that resolves to true if the username exists, false otherwise.
   * @throws Error if there is an error while checking the username.
   */
  public async usernameExist(
    username: string
  ): Promise<any> {
    try {
        if(username.match(VALID_USERNAME_REGEX)) {
  
          const response: UsersEntity = await this.userRepository
              .createQueryBuilder('user')
              .select(['user.username'])
              .where("LOWER(user.username) like :userUsername", { userUsername: `%${username.toLowerCase()}%` })
              .getOne();

          LoggingMessages.log(response, 'UsersService.usernameExist(username) -> response', this.dataForLog);
          return response ? true : false;
        }

        return false;
    } catch(error) {
      throw ErrorManager.createSignatureError(error.message);
    }
  }

  /**
   * Checks if an email exists in the database.
   * @param email - The email to check.
   * @returns A promise that resolves to true if the email exists, false otherwise.
   * @throws An error if there is an issue with the database query.
   */
  public async emailExist(
    email: string
  ): Promise<any> {
    try {
      if(email.match(VALID_EMAIL_REGEX)) {
        const response: UsersEntity = await this.userRepository
            .createQueryBuilder('user')
            .select(['user.email'])
            .where("LOWER(user.email) like :userEmail", { userEmail: `%${email.toLowerCase()}%` })
            .getOne();

        LoggingMessages.log(response, 'UsersService.emailExist(email) -> response', this.dataForLog);
        return response ? true : false;
      }

      return false;
    } catch(error) {
      throw ErrorManager.createSignatureError(error.message);
    }
  }

  /**
   * Finds a user by their ID and returns only the ID and role.
   * @param id - The ID of the user to find.
   * @returns A Promise that resolves to a UsersEntity object containing only the ID and role of the user.
   * @throws ErrorManager - If the user is not found by ID.
   */
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
          type: 'NO_CONTENT',
          message: 'User not found by Id.'
        });
      }

      LoggingMessages.log(user, 'UsersService.findIdRoleOnly(id) -> user', this.dataForLog);
      return user;
    } catch(error) {
      throw ErrorManager.createSignatureError(error.message);
    }
  }

  /**
   * Finds a user by ID.
   * @param id - The ID of the user to find.
   * @returns The found user.
   */
  public async findOneUser(
    id: string
  ): Promise<UsersEntity> {
    try {
      const user: UsersEntity = await this.userRepository
        .createQueryBuilder('user')
        .where({id})
        .leftJoin('user.posts', 'posts', this.onlyPublished('posts', this.request))
        .addSelect([
          'posts.id', 'posts.updateAt', 'posts.title',
          'posts.description', 'posts.status', 'posts.category'
        ])
        .leftJoin('posts.category', 'posts_category', this.onlyPublished('posts_category', this.request))
        .addSelect([
          'posts_category.id', 'posts_category.updateAt', 'posts_category.title',
          'posts_category.description', 'posts_category.status'
        ])
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
          type: 'NO_CONTENT',
          message: 'User not found.'
        });
      }

      LoggingMessages.log(user, 'UsersService.findOneUser(id) -> user', this.dataForLog);
      return user;
    } catch(error) {
      throw ErrorManager.createSignatureError(error.message);
    }
  }

  /**
   * Finds the profile of the authenticated user.
   * @param request - The request object.
   * @returns The user's profile.
   */
  public async findOwnProfile(request: any): Promise<UsersEntity> {
    const currentToken = request.headers['access_token'];
    const manageToken: IUseToken | string = useToken(currentToken); 
    const id = manageToken.sub;

    try {      
      const user: UsersEntity = await this.userRepository
          .createQueryBuilder('user')
          .where({id})
          .leftJoin('user.posts', 'posts', this.onlyPublished('posts', this.request))
          .addSelect([
            'posts.id', 'posts.updateAt', 'posts.title',
            'posts.description', 'posts.status', 'posts.category'
          ])
          .leftJoin('posts.category', 'posts_category', this.onlyPublished('posts_category', this.request))
          .addSelect([
            'posts_category.id', 'posts_category.updateAt', 'posts_category.title',
            'posts_category.description', 'posts_category.status'
          ])
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
          type: 'NO_CONTENT',
          message: 'Error while loading your user data.'
        });
      }

      LoggingMessages.log(user, 'UsersService.findOwnProfile(request) -> user', this.dataForLog);
      return user;
    } catch(error) {
      throw ErrorManager.createSignatureError(error.message);
    }
  }

  /**
   * Finds all users.
   * @param query - The pagination query.
   * @returns The paginated list of users.
   */
  public async findAllUsers(
    query: PaginateQuery
  ): Promise<Paginated<UsersEntity>> {
    try {
      const queryBuilder = this.userRepository
        .createQueryBuilder('users')
        .where(this.onlyEnabledUsers(this.request))
        .leftJoin('users.posts', 'posts', this.onlyPublished('posts', this.request))
        .addSelect([
          'posts.id', 'posts.updateAt', 'posts.title',
          'posts.description', 'posts.status', 'posts.category'
        ])
        .leftJoin('posts.category', 'posts_category', this.onlyPublished('posts_category', this.request))
        .addSelect([
          'posts_category.id', 'posts_category.updateAt', 'posts_category.title',
          'posts_category.description', 'posts_category.status'
        ])
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
          type: 'NO_CONTENT',
          message: 'Users not found.'
        });
      }

      LoggingMessages.log(users, 'UsersService.findAllUsers() -> users', this.dataForLog);
      return users;
    } catch(error){
      throw ErrorManager.createSignatureError(error.message);
    }
  }

  /**
   * Searches for users based on the provided query parameters.
   * @param query - The query parameters for pagination.
   * @returns A promise that resolves to a paginated list of users.
   * @throws An error if no users are found.
   */
  public async searchUsers(
    query: PaginateQuery
  ): Promise<Paginated<UsersEntity>> {
    try {
      const queryBuilder = this.userRepository
        .createQueryBuilder('users')
        .where(this.onlyEnabledUsers(this.request))
        .leftJoin('users.posts', 'posts', this.onlyPublished('posts', this.request))
        .addSelect([
          'posts.id', 'posts.updateAt', 'posts.title',
          'posts.description', 'posts.status', 'posts.category'
        ])
        .leftJoin('posts.category', 'posts_category', this.onlyPublished('posts_category', this.request))
        .addSelect([
          'posts_category.id', 'posts_category.updateAt', 'posts_category.title',
          'posts_category.description', 'posts_category.status'
        ])
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
        (this.isRoleBasic(this.request) ? USERS_SEARCH_CONFIG_LOW : USERS_SEARCH_CONFIG)
      )

      if(Object.keys(users.data).length === 0) {
        throw new ErrorManager({
          type: 'NO_CONTENT',
          message: 'Users not found.'
        });
      }

      LoggingMessages.log(users, 'UsersService.searchUsers() -> users', this.dataForLog);
      return users;
    } catch(error){
      throw ErrorManager.createSignatureError(error.message);
    }
  }

  /**
   * Filters for users based on the provided query parameters.
   * @param query - The query parameters for pagination.
   * @returns A promise that resolves to a paginated list of users.
   * @throws An error if no users are found.
   */
  public async filterUsers(
    query: PaginateQuery
  ): Promise<Paginated<UsersEntity>> {
    try {
      const queryBuilder = this.userRepository
        .createQueryBuilder('users')
        .where(this.onlyEnabledUsers(this.request))
        .leftJoin('users.posts', 'posts', this.onlyPublished('posts', this.request))
        .addSelect([
          'posts.id', 'posts.updateAt', 'posts.title',
          'posts.description', 'posts.status', 'posts.category'
        ])
        .leftJoin('posts.category', 'posts_category', this.onlyPublished('posts_category', this.request))
        .addSelect([
          'posts_category.id', 'posts_category.updateAt', 'posts_category.title',
          'posts_category.description', 'posts_category.status'
        ])
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
        (this.isRoleBasic(this.request) ? USERS_FILTER_CONFIG_LOW : USERS_FILTER_CONFIG)
      )

      if(Object.keys(users.data).length === 0) {
        throw new ErrorManager({
          type: 'NO_CONTENT',
          message: 'Users not found.'
        });
      }

      LoggingMessages.log(users, 'UsersService.filterUsers() -> users', this.dataForLog);
      return users;
    } catch(error){
      throw ErrorManager.createSignatureError(error.message);
    }
  }
}
