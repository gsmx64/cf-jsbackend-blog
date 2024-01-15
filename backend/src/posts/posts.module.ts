import { Module } from '@nestjs/common';
import { PostsService } from './services/posts.service';
import { PostsController } from './controllers/posts.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { PostsEntity } from './entities/posts.entity';
import { UsersService } from 'src/users/services/users.service';
import { AuthService } from 'src/auth/services/auth.service';
import { JwtService } from '@nestjs/jwt';
import { UsersPostsEntity } from 'src/users/entities/usersPosts.entity';
import { UsersCommentsEntity } from 'src/users/entities/usersComments.entity';
import { UsersEntity } from 'src/users/entities/users.entity';

@Module({
  imports: [
    TypeOrmModule.forFeature([
      PostsEntity,
      UsersEntity,
      UsersPostsEntity,
      UsersCommentsEntity
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
