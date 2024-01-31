import { Body, Controller, DefaultValuePipe, Delete, Get, Param, ParseIntPipe,
          Post, Put, Query, Request, UseGuards } from '@nestjs/common';
import { ApiHeader, ApiParam, ApiQuery, ApiTags } from '@nestjs/swagger';
import { Pagination } from 'nestjs-typeorm-paginate';
import { Request as ExpressRequest } from 'express';
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
import { paginationRoute } from '../../utils/pagination.route';
import { USERS_SEARCH_CONFIG } from '../filters/users.search';
import { USERS_FILTER_CONFIG } from '../filters/users.filter';


@ApiTags('Users')
@Controller('users')
@UseGuards(LocalAuthGuard, LocalRolesGuard)
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  @ApiParam({
    name: 'body',
    type: 'string',
    required: true,
    example: '{ "username": "user", "password": "password123", "status": "PENDING", "role": "ADMIN", \
      "firstName": "User", "lastName": "Tester", "email": "admin@tester.com", "age": 25, \
      "city": "City", "country": "Country", "avatar": "https://url.com/avatar.png", "karma": 0 }',
    description: 'The body data to create a comment.'
  })
  @PublicAccess()
  @Post('register')
  public async registerUser(
    @Body() body: UserCreateDTO
  ) {
    return this.usersService.createUser(body);
  }

  @ApiParam({
    name: 'id',
    type: 'string',
    required: false,
    example: 'f68b3d30-e04a-4a19-b211-b3c809c2ded9',
    description: 'The user uuid to edit their data.'
  })
  @ApiHeader({
    name: 'access_token',
    required: true,
    example: 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJyt2xlIjoiQJRNSU4iLCJzdWIiOiJmNjhiM2QzMC1lMDRhLTRhMTktYjIxMS1iM2M4MDljHmRlZDkeLCJpYXQiOjE3MDY1NTg1NTksImV4cCI6MGcwNjU1ODU2Mn0.Udvy-Obf-FpstpTeE5W1F0PynN_RXLDhOeUfdkqgtXU',
    description: 'The user\'s Jwt token.'
  })
  @AdminAccess()
  @Put('edit/:id')
  public async updateUser(
    @Param('id') id: string, 
    @Body() body: UserUpdateDTO
  ) {
    return this.usersService.updateUser(body, id);
  }

  @ApiParam({
    name: 'id',
    type: 'string',
    required: false,
    example: 'f68b3d30-e04a-4a19-b211-b3c809c2ded9',
    description: 'The user uuid to delete their data.'
  })
  @ApiHeader({
    name: 'access_token',
    required: true,
    example: 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJyt2xlIjoiQJRNSU4iLCJzdWIiOiJmNjhiM2QzMC1lMDRhLTRhMTktYjIxMS1iM2M4MDljHmRlZDkeLCJpYXQiOjE3MDY1NTg1NTksImV4cCI6MGcwNjU1ODU2Mn0.Udvy-Obf-FpstpTeE5W1F0PynN_RXLDhOeUfdkqgtXU',
    description: 'The user\'s Jwt token.'
  })
  @AdminAccess()
  @Delete('delete/:id')
  public async deleteUser(
    @Param('id') id: string
  ) {
    return this.usersService.deleteUser(id);
  }

  @ApiParam({
    name: 'id',
    type: 'string',
    required: true,
    example: 'f68b3d30-e04a-4a19-b211-b3c809c2ded9',
    description: 'The user uuid to search their data.'
  })
  @ApiHeader({
    name: 'access_token',
    required: true,
    example: 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJyt2xlIjoiQJRNSU4iLCJzdWIiOiJmNjhiM2QzMC1lMDRhLTRhMTktYjIxMS1iM2M4MDljHmRlZDkeLCJpYXQiOjE3MDY1NTg1NTksImV4cCI6MGcwNjU1ODU2Mn0.Udvy-Obf-FpstpTeE5W1F0PynN_RXLDhOeUfdkqgtXU',
    description: 'The user\'s Jwt token.'
  })
  @AdminAccess()
  @Roles('MODERATOR', 'EDITOR', 'BASIC')
  @Get('view/:id')
  public async findOneUser(
    @Param('id') id: string
  ) {
    return this.usersService.findOneUser(id);
  }

  @ApiHeader({
    name: 'access_token',
    required: true,
    example: 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJyt2xlIjoiQJRNSU4iLCJzdWIiOiJmNjhiM2QzMC1lMDRhLTRhMTktYjIxMS1iM2M4MDljHmRlZDkeLCJpYXQiOjE3MDY1NTg1NTksImV4cCI6MGcwNjU1ODU2Mn0.Udvy-Obf-FpstpTeE5W1F0PynN_RXLDhOeUfdkqgtXU',
    description: 'The user\'s Jwt token.'
  })
  @AdminAccess()
  @Roles('MODERATOR', 'EDITOR', 'BASIC')
  @Get('profile')
  public async findOwnProfile(@Request() request: Request) {
    return this.usersService.findOwnProfile(request);
  }

  @ApiQuery({
    name: 'page',
    type: 'integer',
    required: false,
    example: 1,
    description: 'The number of items to skip before starting to collect the result set.'
  })
  @ApiQuery({
    name: 'limit',
    type: 'integer',
    required: false,
    example: 10,
    description: 'The numbers of items to return.'
  })
  @ApiHeader({
    name: 'access_token',
    required: true,
    example: 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJyt2xlIjoiQJRNSU4iLCJzdWIiOiJmNjhiM2QzMC1lMDRhLTRhMTktYjIxMS1iM2M4MDljHmRlZDkeLCJpYXQiOjE3MDY1NTg1NTksImV4cCI6MGcwNjU1ODU2Mn0.Udvy-Obf-FpstpTeE5W1F0PynN_RXLDhOeUfdkqgtXU',
    description: 'The user\'s Jwt token.'
  })
  @AdminAccess()
  @Roles('MODERATOR')
  @Get('list')
  public async findAllUsers(
    @Query('page', new DefaultValuePipe(1), ParseIntPipe) page: number = 1,
    @Query('limit', new DefaultValuePipe(
      process.env.APP_PAGINATION_DEFAULT_LIMIT || 10), ParseIntPipe
    ) limit: number = process.env.APP_PAGINATION_DEFAULT_LIMIT || 10,
    @Request() req: ExpressRequest
  ): Promise<Pagination<UsersEntity>> {
    limit = limit > process.env.APP_PAGINATION_MAX_LIMIT || 100 ? 
      process.env.APP_PAGINATION_MAX_LIMIT || 100 : limit;
    return this.usersService.findAllUsers({
      page,
      limit,
      route: paginationRoute(req),
    });
  }

  @ApiOkPaginatedResponse(
    UserUpdateDTO,
    USERS_SEARCH_CONFIG,
  )
  @ApiPaginationQuery(USERS_SEARCH_CONFIG)
  @AdminAccess()
  @Roles('MODERATOR', 'EDITOR', 'BASIC')
  @Get('search')
  public async searchUsers(
    @Paginate() query: PaginateQuery,
    @Request() request: Request
  ): Promise<Paginated<UsersEntity>> {
    return this.usersService.searchUsers(query, request);
  }

  @ApiOkPaginatedResponse(
    UserUpdateDTO,
    USERS_FILTER_CONFIG,
  )
  @ApiPaginationQuery(USERS_FILTER_CONFIG)
  @AdminAccess()
  @Roles('MODERATOR', 'EDITOR', 'BASIC')
  @Get('filter')
  public async filterUsers(
    @Paginate() query: PaginateQuery,
    @Request() request: Request
  ): Promise<Paginated<UsersEntity>> {
    return this.usersService.filterUsers(query, request);
  }
}
