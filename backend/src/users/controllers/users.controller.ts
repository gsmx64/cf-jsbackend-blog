/**
 * Controller responsible for handling the users related API endpoints.
 */
import { Body, Controller, Delete, Get, Param,
          Post, Put, Request, UseGuards } from '@nestjs/common';
import { ApiBearerAuth, ApiParam, ApiTags } from '@nestjs/swagger';
import { ApiOkPaginatedResponse, ApiPaginationQuery, Paginate,
  PaginateQuery, Paginated } from 'nestjs-paginate';

import { UsersService } from '../services/users.service';
import { LocalAuthGuard } from '../../auth/guards/local-auth.guard';
import { LocalRolesGuard } from '../../auth/guards/local-auth.roles.guard';
import { UserCreateDTO } from '../dto/user.create.dto';
import { UserUpdateDTO } from '../dto/user.update.dto';
import { AdminAccess } from '../../auth/decorators/admin.decorator';
import { PublicAccess } from '../../auth/decorators/public.decorator';
import { Roles } from '../../auth/decorators/roles.decorator';
import { UsersEntity } from '../entities/users.entity';
import { USERS_SEARCH_CONFIG } from '../filters/users.search';
import { USERS_FILTER_CONFIG } from '../filters/users.filter';
import { SWAGGER_ID_EXAMPLE, 
  SWAGGER_USER_BODY_EXAMPLE } from '../../constants/swagger.examples';
import { USERS_DEFAULT_CONFIG } from '../filters/users.default';


/**
 * Controller responsible for handling users operations.
 */
@ApiTags('Users')
@Controller('users')
@UseGuards(LocalAuthGuard, LocalRolesGuard)
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  /**
   * Creates a new user.
   * @param body - The user data to be created.
   * @returns The created user.
   */
  @ApiParam({
    name: 'body',
    type: 'string',
    required: true,
    example: SWAGGER_USER_BODY_EXAMPLE,
    description: 'The body data to create a user.'
  })
  @PublicAccess()
  @Post('register')
  public async registerUser(
    @Body() body: UserCreateDTO
  ) {
    return this.usersService.createUser(body);
  }

  /**
   * Checks if a username exists in the database.
   * @param username - The username to check.
   * @returns If the username exists, false otherwise.
   */
  @ApiParam({
    name: 'username',
    type: 'string',
    required: true,
    example: 'tester',
    description: 'The username to validate if exists in users database.'
  })
  @PublicAccess()
  @Get('verify/username/:username')
  public async usernameExist(@Param('username') username: string) {
    return this.usersService.usernameExist(username);
  }

  /**
   * Checks if an email exists in the database.
   * @param email - The email to check.
   * @returns If the email exists, false otherwise.
   */
  @ApiParam({
    name: 'email',
    type: 'string',
    required: true,
    example: 'email@domain.com',
    description: 'The email to validate if exists in users database.'
  })
  @PublicAccess()
  @Get('verify/email/:email')
  public async emailExist(@Param('email') email: string) {
    return this.usersService.emailExist(email);
  }

  /**
   * Update a user's data.
   * @param id - The user uuid to edit their data.
   * @param body - The updated user data.
   * @param request - The request object.
   * @returns The updated user.
   */
  @ApiParam({
    name: 'id',
    type: 'string',
    required: true,
    example: SWAGGER_ID_EXAMPLE,
    description: 'The user uuid to edit their data.'
  })
  @ApiBearerAuth('access_token')
  @UseGuards(LocalAuthGuard)
  @Put('edit/:id')
  public async updateUser(
    @Param('id') id: string, 
    @Body() body: UserUpdateDTO,
    @Request() request: Request
  ) {
    return this.usersService.updateUser(body, id, request);
  }

  /**
   * Delete a user's data.
   * @param id - The user uuid to delete their data.
   * @returns The deleted user.
   */
  @ApiParam({
    name: 'id',
    type: 'string',
    required: true,
    example: SWAGGER_ID_EXAMPLE,
    description: 'The user uuid to delete their data.'
  })
  @ApiBearerAuth('access_token')
  @AdminAccess()
  @Delete('delete/:id')
  public async deleteUser(
    @Param('id') id: string
  ) {
    return this.usersService.deleteUser(id);
  }

  /**
   * Find a user's data.
   * @param id - The user uuid to search their data.
   * @returns The found user.
   */
  @ApiParam({
    name: 'id',
    type: 'string',
    required: true,
    //example: SWAGGER_ID_EXAMPLE,
    description: 'The user uuid to search their data.'
  })
  @ApiBearerAuth('access_token')
  @AdminAccess()
  @Roles('MODERATOR', 'EDITOR', 'BASIC')
  @Get('view/:id')
  public async findOneUser(
    @Param('id') id: string
  ) {
    return this.usersService.findOneUser(id);
  }

  /**
   * Find the profile of the currently logged-in admin user.
   * @param request - The request object.
   * @returns The user's profile.
   */
  @ApiBearerAuth('access_token')
  @AdminAccess()
  @Roles('MODERATOR', 'EDITOR', 'BASIC')  
  @Get('profile')
  public async findOwnProfile(@Request() request: Request) {
    return this.usersService.findOwnProfile(request);
  }

  /**
   * Find all users with pagination.
   * @param query - The pagination query parameters.
   * @returns A paginated list of users.
   */
  @ApiOkPaginatedResponse(
    UserUpdateDTO,
    USERS_DEFAULT_CONFIG,
  )
  @ApiPaginationQuery(USERS_DEFAULT_CONFIG)
  @ApiBearerAuth('access_token')
  @AdminAccess()
  @Roles('MODERATOR')
  @Get('list')
  public async findAllUsers(
    @Paginate() query: PaginateQuery
  ): Promise<Paginated<UsersEntity>> {
    return this.usersService.findAllUsers(query);
  }

  /**
   * Searches for users based on the provided query parameters.
   * @param query The pagination query parameters.
   * @returns A paginated list of users.
   */
  @ApiOkPaginatedResponse(
    UserUpdateDTO,
    USERS_SEARCH_CONFIG,
  )
  @ApiPaginationQuery(USERS_SEARCH_CONFIG)
  @ApiBearerAuth('access_token')
  @AdminAccess()
  @Roles('MODERATOR', 'EDITOR', 'BASIC')
  @Get('search')
  public async searchUsers(
    @Paginate() query: PaginateQuery
  ): Promise<Paginated<UsersEntity>> {
    return this.usersService.searchUsers(query);
  }

  /**
   * Filters for users based on the provided query parameters.
   * @param query The pagination query parameters.
   * @returns A paginated list of users.
   */
  @ApiOkPaginatedResponse(
    UserUpdateDTO,
    USERS_FILTER_CONFIG,
  )
  @ApiPaginationQuery(USERS_FILTER_CONFIG)
  @ApiBearerAuth('access_token')
  @AdminAccess()
  @Roles('MODERATOR', 'EDITOR', 'BASIC')
  @Get('filter')
  public async filterUsers(
    @Paginate() query: PaginateQuery
  ): Promise<Paginated<UsersEntity>> {
    return this.usersService.filterUsers(query);
  }
}
