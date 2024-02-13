import { Body, Controller, Delete, Get, Param,
          Post, Put, UseGuards } from '@nestjs/common';
import { ApiBearerAuth, ApiParam, ApiQuery, ApiTags } from '@nestjs/swagger';
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
import { CommentsEntity } from '../entities/comments.entity';
import { COMMENTS_DEFAULT_CONFIG } from '../filters/comments.default';
import { COMMENTS_SEARCH_CONFIG } from '../filters/comments.search';
import { COMMENTS_FILTER_CONFIG } from '../filters/comments.filter';
import { SWAGGER_COMMENT_BODY_EXAMPLE,
  SWAGGER_ID_EXAMPLE } from '../../constants/swagger.examples';


@ApiTags('Comments')
@Controller('comments')
@UseGuards(LocalAuthGuard, LocalRolesGuard)
export class CommentsController {
  constructor(private readonly commentsService: CommentsService) {}

  @ApiParam({
    name: 'body',
    type: 'string',
    required: true,
    example: SWAGGER_COMMENT_BODY_EXAMPLE,
    description: 'The body data to create a comment.'
  })
  @ApiBearerAuth('access_token')
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
    example: SWAGGER_ID_EXAMPLE,
    description: 'The comment uuid to edit its data.'
  })
  @ApiBearerAuth('access_token')
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
    example: SWAGGER_ID_EXAMPLE,
    description: 'The comment uuid to delete its data.'
  })
  @ApiBearerAuth('access_token')
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
    example: SWAGGER_ID_EXAMPLE,
    description: 'The comment uuid to search its data.'
  })
  @ApiBearerAuth('access_token')
  @PublicAccess()
  @Get('view/:id')
  public async findOneComment(
    @Param('id') id: string
  ) {
    return this.commentsService.findOneComment(id);
  }

  @ApiParam({
    name: 'id',
    type: 'string',
    required: true,
    example: SWAGGER_ID_EXAMPLE,
    description: 'The user uuid to search his/her comments.'
  })
  @ApiOkPaginatedResponse(
    CommentUpdateDTO,
    COMMENTS_DEFAULT_CONFIG,
  )
  @ApiPaginationQuery(COMMENTS_DEFAULT_CONFIG)
  @ApiBearerAuth('access_token')
  @PublicAccess()
  @Get('user/:id')
  public async findCommentsByUser(
    @Param('id') id: string,
    @Paginate() query: PaginateQuery
  ): Promise<Paginated<CommentsEntity>> {
    return this.commentsService.findCommentsByUser(id, query);
  }

  @ApiOkPaginatedResponse(
    CommentUpdateDTO,
    COMMENTS_FILTER_CONFIG,
  )
  @ApiPaginationQuery(COMMENTS_FILTER_CONFIG)
  @ApiBearerAuth('access_token')
  @PublicAccess()
  @Get('list')
  public async findAllComments(
    @Paginate() query: PaginateQuery
  ): Promise<Paginated<CommentsEntity>> {
    return this.commentsService.findAllComments(query);
  }

  @ApiOkPaginatedResponse(
    CommentUpdateDTO,
    COMMENTS_SEARCH_CONFIG,
  )
  @ApiPaginationQuery(COMMENTS_SEARCH_CONFIG)
  @ApiBearerAuth('access_token')
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
  @ApiBearerAuth('access_token')
  @AdminAccess()
  @Roles('MODERATOR', 'EDITOR', 'BASIC')
  @Get('filter')
  public async filterPosts(
    @Paginate() query: PaginateQuery
  ): Promise<Paginated<CommentsEntity>> {
    return this.commentsService.filterComments(query);
  }
}
