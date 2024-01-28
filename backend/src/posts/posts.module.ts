import { Module } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { TypeOrmModule } from '@nestjs/typeorm';

import { PostsController } from './controllers/posts.controller';
import { AuthService } from '../auth/services/auth.service';
import { UsersService } from '../users/services/users.service';
import { PostsService } from './services/posts.service';

import { UsersEntity } from '../users/entities/users.entity';
import { CategoriesEntity } from '../categories/entities/categories.entity';
import { PostsEntity } from './entities/posts.entity';
import { CommentsEntity } from '../comments/entities/comments.entity';


@Module({
  imports: [
    TypeOrmModule.forFeature([
      PostsEntity,
      UsersEntity,
      CategoriesEntity,
      CommentsEntity
    ])
  ],
  providers: [
    PostsService,
    AuthService,
    JwtService,
    UsersService
  ],
  controllers: [PostsController]
})
export class PostsModule {}
