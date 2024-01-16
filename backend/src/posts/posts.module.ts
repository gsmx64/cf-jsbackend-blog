import { Module } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { TypeOrmModule } from '@nestjs/typeorm';
import { PostsController } from './controllers/posts.controller';
import { AuthService } from 'src/auth/services/auth.service';
import { UsersService } from 'src/users/services/users.service';
import { PostsService } from './services/posts.service';
import { PostsEntity } from './entities/posts.entity';
import { UsersEntity } from 'src/users/entities/users.entity';

@Module({
  imports: [
    TypeOrmModule.forFeature([
      PostsEntity,
      UsersEntity
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
