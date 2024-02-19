/**
 * Module for the categories functionality.
 */
import { Module } from '@nestjs/common';
import { CategoriesService } from './services/categories.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { JwtService } from '@nestjs/jwt';

import { CategoriesController } from './controllers/categories.controller';
import { AuthService } from '../auth/services/auth.service';
import { UsersService } from '../users/services/users.service';
import { CategoriesEntity } from './entities/categories.entity';
import { UsersEntity } from '../users/entities/users.entity';
import { PostsEntity } from '../posts/entities/posts.entity';


@Module({
  imports: [
    TypeOrmModule.forFeature([
      CategoriesEntity,
      UsersEntity,
      PostsEntity      
    ])
  ],
  providers: [
    CategoriesService,
    AuthService,
    JwtService,
    UsersService
  ],
  controllers: [CategoriesController]
})

export class CategoriesModule {}