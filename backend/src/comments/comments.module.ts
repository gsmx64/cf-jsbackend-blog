/**
 * Module for the comments functionality.
 */
import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { JwtService } from '@nestjs/jwt';

import { CommentsController } from './controllers/comments.controller';
import { AuthService } from '../auth/services/auth.service';
import { UsersService } from '../users/services/users.service';
import { CommentsService } from './services/comments.service';
import { CommentsEntity } from './entities/comments.entity';
import { UsersEntity } from '../users/entities/users.entity';
import { PostsEntity } from '../posts/entities/posts.entity';


@Module({
  imports: [
    TypeOrmModule.forFeature([
      CommentsEntity,
      UsersEntity,
      PostsEntity
    ])  
  ],
  providers: [
    CommentsService,
    AuthService,
    JwtService,
    UsersService
  ],
  controllers: [CommentsController]
})

export class CommentsModule {}