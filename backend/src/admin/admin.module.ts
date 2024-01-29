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
import { PostsService } from 'src/posts/services/posts.service';
import { CategoriesService } from 'src/categories/services/categories.service';


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
    PostsService
  ],
  controllers: [AdminController],
  exports: [AdminService, TypeOrmModule]
})
export class AdminModule {}
