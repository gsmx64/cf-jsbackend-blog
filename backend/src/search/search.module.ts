/**
 * Module for the searches functionality.
 */
import { Module } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { TypeOrmModule } from '@nestjs/typeorm';

import { SearchController } from './controllers/search.controller';
import { AuthService } from '../auth/services/auth.service';
import { UsersService } from '../users/services/users.service';
import { SearchService } from './services/search.service';
import { UsersEntity } from '../users/entities/users.entity';
import { PostsEntity } from '../posts/entities/posts.entity';
import { CategoriesEntity } from '../categories/entities/categories.entity';
import { CommentsEntity } from '../comments/entities/comments.entity';
import { SettingsEntity } from '../settings/entities/settings.entity';


@Module({
  imports: [
    TypeOrmModule.forFeature([
      PostsEntity,
      UsersEntity,
      CategoriesEntity,
      CommentsEntity,
      SettingsEntity
    ])
  ],
  providers: [
    SearchService,
    AuthService,
    JwtService,
    UsersService
  ],
  controllers: [SearchController]
})
export class SearchModule {}
