import { ConfigModule, ConfigService } from '@nestjs/config';
import { DataSource, DataSourceOptions } from 'typeorm';
import { SnakeNamingStrategy } from 'typeorm-naming-strategies';

ConfigModule.forRoot({
  envFilePath: /*`.${process.env.NODE_ENV}.env`*/'.development.env',
});

const configService = new ConfigService();

export const DataSourceConfig: DataSourceOptions = {
  migrationsTableName: 'migrations',
  type: 'postgres',
  host: configService.get<string>('DB_HOST'),
  port: configService.get<number>('DB_PORT'),
  username: configService.get<string>('DB_USER'),
  password: configService.get<string>('DB_PASSWORD'),
  database: configService.get<string>('DB_NAME'),
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
