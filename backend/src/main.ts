import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ConfigService } from '@nestjs/config';
import * as morgan from 'morgan';
import { CORS } from './constants';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  
  app.use(morgan('dev'));

  const configService = app.get(ConfigService);

  app.enableCors(CORS);

  app.setGlobalPrefix('api');

  await app.listen(configService.get('APP_PORT'));

  var decor = '-';
  console.log(` \n` + decor.repeat(36));
  console.log(` APP PORT: ` + configService.get('APP_PORT'));
  console.log(` APP RUNNING ON: ${await app.getUrl()}`);
  console.log(decor.repeat(36) + ` \n`);
}
bootstrap();
