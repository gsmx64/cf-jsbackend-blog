import { Module } from '@nestjs/common';
import { CommentsService } from './services/comments.service';
import { CommentsController } from './controllers/comments.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { CommentsEntity } from './entities/comments.entity';
import { UsersService } from 'src/users/services/users.service';
import { AuthService } from 'src/auth/services/auth.service';
import { JwtService } from '@nestjs/jwt';
import { UsersEntity } from 'src/users/entities/users.entity';
import { UsersPostsEntity } from 'src/users/entities/usersPosts.entity';
import { UsersCommentsEntity } from 'src/users/entities/usersComments.entity';

@Module({
  imports: [
    TypeOrmModule.forFeature([
      CommentsEntity,
      UsersEntity,
      UsersPostsEntity,
      UsersCommentsEntity
    ])  
  ],
  providers: [
    CommentsService,
    AuthService,
    JwtService,
    UsersService
  ],
  controllers: [CommentsController]
})
export class CommentsModule {}
