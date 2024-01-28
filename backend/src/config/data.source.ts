import { ConfigModule } from '@nestjs/config';
import { DataSource, DataSourceOptions } from 'typeorm';
import { SnakeNamingStrategy } from 'typeorm-naming-strategies';

import { UsersEntity } from '../users/entities/users.entity';
import { PostsEntity } from '../posts/entities/posts.entity';
import { CategoriesEntity } from '../categories/entities/categories.entity';
import { CommentsEntity } from '../comments/entities/comments.entity';


ConfigModule.forRoot({
  envFilePath: `.${process.env.NODE_ENV.trim()}.env`,
});

export const DataSourceConfig: DataSourceOptions = {
  migrationsTableName: 'migrations',
  type: 'postgres',
  host: <string>process.env.DB_HOST,
  port: <number>Number(process.env.DB_PORT),
  username: <string>process.env.DB_USER,
  password: <string>process.env.DB_PASSWORD,
  database: <string>process.env.DB_NAME,
  logging: false,
  synchronize: true,
  name: 'default',
  entities: [UsersEntity, PostsEntity, CategoriesEntity, CommentsEntity], 
  migrations: [__dirname + '/../migrations/**/*{.ts,.js}'],
  subscribers: [__dirname + '/../subscriber/**/*{.ts,.js}'],
  migrationsRun: true,
  namingStrategy: new SnakeNamingStrategy()
};

export const AppDS = new DataSource(DataSourceConfig);
