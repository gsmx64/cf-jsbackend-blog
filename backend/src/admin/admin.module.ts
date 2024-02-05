import { Module } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { TypeOrmModule } from '@nestjs/typeorm';

import { AuthService } from '../auth/services/auth.service';
import { AdminController } from './controllers/admin.controller';
import { AdminService } from './services/admin.service';
import { UsersEntity } from './../users/entities/users.entity';
import { PostsEntity } from '../posts/entities/posts.entity';
import { CommentsEntity } from '../comments/entities/comments.entity';
import { CategoriesEntity } from '../categories/entities/categories.entity';
import { UsersService } from '../users/services/users.service';
import { PostsService } from '../posts/services/posts.service';
import { CategoriesService } from '../categories/services/categories.service';
import { CommentsService } from '../comments/services/comments.service';
import { SearchService } from '../search/services/search.service';


@Module({
  imports: [
    TypeOrmModule.forFeature([
      UsersEntity,
      PostsEntity,
      CommentsEntity,
      CategoriesEntity
    ])
  ],
  providers: [
    AuthService,
    JwtService,
    AdminService,
    UsersService,
    CategoriesService,
    PostsService,
    CommentsService,
    SearchService
  ],
  controllers: [AdminController],
  exports: [AdminService, TypeOrmModule]
})

export class AdminModule {}