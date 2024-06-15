/**
 * Module for the settings functionality.
 */
import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { JwtService } from '@nestjs/jwt';

import { SettingsController } from './controllers/settings.controller';
import { AuthService } from '../auth/services/auth.service';
import { UsersService } from '../users/services/users.service';
import { SettingsService } from './services/settings.service';
import { SettingsEntity } from './entities/settings.entity';
import { UsersEntity } from '../users/entities/users.entity';
import { PostsEntity } from '../posts/entities/posts.entity';


@Module({
  imports: [
    TypeOrmModule.forFeature([
      SettingsEntity,
      UsersEntity,
      PostsEntity
    ])  
  ],
  providers: [
    SettingsService,
    AuthService,
    JwtService,
    UsersService
  ],
  controllers: [SettingsController]
})

export class SettingsModule {}