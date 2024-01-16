import { Module } from '@nestjs/common';
import { CategoriesService } from './services/categories.service';
import { CategoriesController } from './controllers/categories.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { CategoriesEntity } from './entities/categories.entity';
import { UsersService } from 'src/users/services/users.service';
import { AuthService } from 'src/auth/services/auth.service';
import { JwtService } from '@nestjs/jwt';
import { UsersEntity } from 'src/users/entities/users.entity';

@Module({
  imports: [
    TypeOrmModule.forFeature(
      [
        CategoriesEntity,
        UsersEntity
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
