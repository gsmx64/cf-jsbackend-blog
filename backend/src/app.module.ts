import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';
import { DataSourceConfig } from './config/data.source';
import { AuthModule } from './auth/auth.module';
import { PostsModule } from './posts/posts.module';
import { UsersModule } from './users/users.module';
import { ProfileModule } from './profile/profile.module';
import { CommentsModule } from './comments/comments.module';

@Module({
  imports: [
    ConfigModule.forRoot({
      envFilePath: '.development.env',
      isGlobal: true,
    }),
    AuthModule,
    TypeOrmModule.forRoot({ ...DataSourceConfig }),
    PostsModule,
    UsersModule,
    ProfileModule,
    CommentsModule,
  ]
})
export class AppModule {}
