import { Body, Controller, DefaultValuePipe, Delete, Get, Param, ParseIntPipe,
          Post, Put, Query, Request, UseGuards } from '@nestjs/common';
import { ApiHeader, ApiParam, ApiQuery, ApiTags } from '@nestjs/swagger';
import { Pagination } from 'nestjs-typeorm-paginate';
import { Request as ExpressRequest } from 'express';
import { ApiOkPaginatedResponse, ApiPaginationQuery, Paginate,
  PaginateQuery, Paginated } from 'nestjs-paginate';

import { CommentsService } from '../services/comments.service';
import { CommentCreateDTO } from '../dto/comment.create.dto';
import { CommentUpdateDTO } from '../dto/comment.update.dto';
import { LocalAuthGuard } from '../../auth/guards/local-auth.guard';
import { LocalRolesGuard } from '../../auth/guards/local-auth.roles.guard';
import { AdminAccess } from '../../auth/decorators/admin.decorator';
import { PublicAccess } from '../../auth/decorators/public.decorator';
import { Roles } from '../../auth/decorators/roles.decorator';
import { paginationRoute } from '../../utils/pagination.route';
import { CommentsEntity } from '../entities/comments.entity';
import { COMMENTS_SEARCH_CONFIG } from '../filters/comments.search';
import { COMMENTS_FILTER_CONFIG } from '../filters/comments.filter';


@ApiTags('Comments')
@Controller('comments')
@UseGuards(LocalAuthGuard, LocalRolesGuard)
export class CommentsController {
  constructor(private readonly commentsService: CommentsService) {}

  @ApiParam({
    name: 'body',
    type: 'string',
    required: true,
    example: '{ "message": "Testing message.", "reaction": "", "author": "f68b3d30-e04a-4a19-b211-b3c809c2ded9", "posts": [] }',
    description: 'The body data to create a comment.'
  })
  @ApiHeader({
    name: 'access_token',
    required: true,
    example: 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJyt2xlIjoiQJRNSU4iLCJzdWIiOiJmNjhiM2QzMC1lMDRhLTRhMTktYjIxMS1iM2M4MDljHmRlZDkeLCJpYXQiOjE3MDY1NTg1NTksImV4cCI6MGcwNjU1ODU2Mn0.Udvy-Obf-FpstpTeE5W1F0PynN_RXLDhOeUfdkqgtXU',
    description: 'The user\'s Jwt token.'
  })
  @AdminAccess()
  @Roles('MODERATOR', 'EDITOR', 'BASIC')
  @Post('create')
  public async createComment(
    @Body() body: CommentCreateDTO
  ) {
    return this.commentsService.createComment(body);
  }

  @ApiParam({
    name: 'id',
    type: 'string',
    required: true,
    example: 'f68b3d30-e04a-4a19-b211-b3c809c2ded9',
    description: 'The comment uuid to edit its data.'
  })
  @ApiHeader({
    name: 'access_token',
    required: true,
    example: 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJyt2xlIjoiQJRNSU4iLCJzdWIiOiJmNjhiM2QzMC1lMDRhLTRhMTktYjIxMS1iM2M4MDljHmRlZDkeLCJpYXQiOjE3MDY1NTg1NTksImV4cCI6MGcwNjU1ODU2Mn0.Udvy-Obf-FpstpTeE5W1F0PynN_RXLDhOeUfdkqgtXU',
    description: 'The user\'s Jwt token.'
  })
  @AdminAccess()
  @Roles('MODERATOR')
  @Put('edit/:id')
  public async updateComment(
    @Param('id') id: string, 
    @Body() body: CommentUpdateDTO
  ) {
    return this.commentsService.updateComment(body, id);
  }

  @ApiParam({
    name: 'id',
    type: 'string',
    required: true,
    example: 'f68b3d30-e04a-4a19-b211-b3c809c2ded9',
    description: 'The comment uuid to delete its data.'
  })
  @ApiHeader({
    name: 'access_token',
    required: true,
    example: 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJyt2xlIjoiQJRNSU4iLCJzdWIiOiJmNjhiM2QzMC1lMDRhLTRhMTktYjIxMS1iM2M4MDljHmRlZDkeLCJpYXQiOjE3MDY1NTg1NTksImV4cCI6MGcwNjU1ODU2Mn0.Udvy-Obf-FpstpTeE5W1F0PynN_RXLDhOeUfdkqgtXU',
    description: 'The user\'s Jwt token.'
  })
  @AdminAccess()
  @Roles('MODERATOR')
  @Delete('delete/:id')
  public async deleteComment(
    @Param('id') id: string
  ) {
    return this.commentsService.deleteComment(id);
  }

  @ApiParam({
    name: 'id',
    type: 'string',
    required: true,
    example: 'f68b3d30-e04a-4a19-b211-b3c809c2ded9',
    description: 'The comment uuid to search its data.'
  })
  @PublicAccess()
  @Get('view/:id')
  public async findOneComment(
    @Param('id') id: string
  ) {
    return this.commentsService.findOneComment(id);
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
  @PublicAccess()
  @Get('list')
  public async findAllComments(
    @Query('page', new DefaultValuePipe(1), ParseIntPipe) page: number = 1,
    @Query('limit', new DefaultValuePipe(
      process.env.APP_PAGINATION_DEFAULT_LIMIT || 10), ParseIntPipe
    ) limit: number = process.env.APP_PAGINATION_DEFAULT_LIMIT || 10,
    @Request() req: ExpressRequest
  ): Promise<Pagination<CommentsEntity>> {
    limit = limit > process.env.APP_PAGINATION_MAX_LIMIT || 100 ? 
      process.env.APP_PAGINATION_MAX_LIMIT || 100 : limit;
    return this.commentsService.findAllComments({
      page,
      limit,
      route: paginationRoute(req),
    });
  }

  @ApiOkPaginatedResponse(
    CommentUpdateDTO,
    COMMENTS_SEARCH_CONFIG,
  )
  @ApiPaginationQuery(COMMENTS_SEARCH_CONFIG)
  @AdminAccess()
  @Roles('MODERATOR', 'EDITOR', 'BASIC')
  @Get('search')
  public async searchComments(
    @Paginate() query: PaginateQuery
  ): Promise<Paginated<CommentsEntity>> {
    return this.commentsService.searchComments(query);
  }

  @ApiOkPaginatedResponse(
    CommentUpdateDTO,
    COMMENTS_FILTER_CONFIG,
  )
  @ApiPaginationQuery(COMMENTS_FILTER_CONFIG)
  @AdminAccess()
  @Roles('MODERATOR', 'EDITOR', 'BASIC')
  @Get('filter')
  public async filterPosts(
    @Paginate() query: PaginateQuery
  ): Promise<Paginated<CommentsEntity>> {
    return this.commentsService.filterComments(query);
  }
}
