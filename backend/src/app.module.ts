/**
 * Represents the main module of the application.
 * This module is responsible for importing and configuring all the necessary modules and dependencies.
 */
import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { PassportModule } from '@nestjs/passport';
import { TypeOrmModule } from '@nestjs/typeorm';

import { DataSourceConfig } from './config/data.source';
import { AuthModule } from './auth/auth.module';
import { AdminModule } from './admin/admin.module';
import { UsersModule } from './users/users.module';
import { PostsModule } from './posts/posts.module';
import { CategoriesModule } from './categories/categories.module';
import { CommentsModule } from './comments/comments.module';
import { SearchModule } from './search/search.module';
import { SettingsModule } from './settings/settings.module';


@Module({
  imports: [
    ConfigModule.forRoot({
      envFilePath: `.env.${process.env.NODE_ENV.trim()}`,
      isGlobal: true
    }),
    AuthModule,
    TypeOrmModule.forRoot({ ...DataSourceConfig }),
    AdminModule,
    UsersModule,
    PostsModule,
    CategoriesModule,
    CommentsModule,
    SearchModule,
    SettingsModule
  ]
})

export class AppModule {}