import { Module } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { TypeOrmModule } from '@nestjs/typeorm';

import { UsersController } from './controllers/users.controller';
import { AuthService } from '../auth/services/auth.service';
import { UsersService } from './services/users.service';
import { UsersEntity } from './entities/users.entity';
import { PostsEntity } from '../posts/entities/posts.entity';
import { CommentsEntity } from '../comments/entities/comments.entity';
import { CategoriesEntity } from '../categories/entities/categories.entity';


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
    UsersService,
    AuthService,
    JwtService
  ],
  controllers: [UsersController],
  exports: [UsersService, TypeOrmModule]
})
export class UsersModule {}
