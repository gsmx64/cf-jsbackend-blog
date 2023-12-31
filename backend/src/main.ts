import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ConfigService } from '@nestjs/config';
import * as morgan from 'morgan';
import * as session from 'express-session';
import { CORS } from './constants';
import { ValidationPipe } from '@nestjs/common';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  
  app.use(morgan('dev'));

  app.useGlobalPipes(
    new ValidationPipe({
      transformOptions: {
        enableImplicitConversion: true,
      },
    }),
  );

  const configService = app.get(ConfigService);

  app.use(
    session({
      secret: configService.get('APP_AUTH_SECRET'),
      resave: false,
      saveUninitialized: false,
    })
  )

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
