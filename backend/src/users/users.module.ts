import { Module } from '@nestjs/common';
import { UsersService } from './services/users.service';
import { UsersController } from './controllers/users.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UsersEntity } from './entities/users.entity';
import { UsersPostsEntity } from './entities/usersPosts.entity';
import { UsersCommentsEntity } from './entities/usersComments.entity';
import { AuthService } from 'src/auth/services/auth.service';
import { JwtService } from '@nestjs/jwt';

@Module({
  imports: [
    TypeOrmModule.forFeature(
      [
        UsersEntity,
        UsersPostsEntity,
        UsersCommentsEntity
      ]
    )
  ],
  providers: [UsersService, AuthService, JwtService],
  controllers: [UsersController],
  exports: [UsersService, TypeOrmModule]
})
export class UsersModule {}
