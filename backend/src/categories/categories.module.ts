import { Module } from '@nestjs/common';
import { CategoriesService } from './services/categories.service';
import { CategoriesController } from './controllers/categories.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { CategoriesEntity } from './entities/categories.entity';
import { CategoriesPostsEntity } from './entities/categoriesPosts.entity';
import { UsersService } from 'src/users/services/users.service';
import { AuthService } from 'src/auth/services/auth.service';
import { JwtService } from '@nestjs/jwt';
import { UsersEntity } from 'src/users/entities/users.entity';
import { UsersPostsEntity } from 'src/users/entities/usersPosts.entity';
import { UsersCommentsEntity } from 'src/users/entities/usersComments.entity';

@Module({
  imports: [
    TypeOrmModule.forFeature(
      [
        CategoriesEntity,
        CategoriesPostsEntity,
        UsersEntity,
        UsersPostsEntity,
        UsersCommentsEntity
      ]
    )
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
