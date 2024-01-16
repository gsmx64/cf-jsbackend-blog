import { ConfigModule } from '@nestjs/config';
import { DataSource, DataSourceOptions } from 'typeorm';
import { SnakeNamingStrategy } from 'typeorm-naming-strategies';

ConfigModule.forRoot({
  envFilePath: `.${process.env.NODE_ENV.trim()}.env`,
});

export const DataSourceConfig: DataSourceOptions = {
  migrationsTableName: 'migrations',
  type: 'postgres',
  host: <string>process.env.DB_HOST,
  port: <number>process.env.DB_PORT,
  username: <string>process.env.DB_USER,
  password: <string>process.env.DB_PASSWORD,
  database: <string>process.env.DB_NAME,
  logging: false,
  synchronize: false,
  name: 'default',
  entities: [__dirname + '/../**/**/*.entity{.ts,.js}'],  
  migrations: [__dirname + '/../migrations/**/*{.ts,.js}'],
  subscribers: [__dirname + '/../subscriber/**/*{.ts,.js}'],
  migrationsRun: true,
  namingStrategy: new SnakeNamingStrategy(),
};

export const AppDS = new DataSource(DataSourceConfig);
