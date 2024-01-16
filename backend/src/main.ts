import { NestFactory, Reflector } from '@nestjs/core';
import { AppModule } from './app.module';
import * as morgan from 'morgan';
import * as session from 'express-session';
import { CORS } from './constants';
import { ClassSerializerInterceptor, ValidationPipe } from '@nestjs/common';

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

  const reflector = app.get(Reflector);
  app.useGlobalInterceptors(new ClassSerializerInterceptor(reflector));

  app.use(
    session({
      secret: process.env.APP_AUTH_SECRET,
      resave: false,
      saveUninitialized: false,
    })
  )

  app.enableCors(CORS);

  app.setGlobalPrefix('api');

  await app.listen(process.env.APP_PORT);

  var decor = '-';
  var appUrl = `http://${process.env.APP_HOST}:${process.env.APP_PORT}/`
  console.log(` \n` + decor.repeat(36));
  console.log(` >>> APP URL: ${appUrl}`);
  console.log(` >>> ENVIRONMENT: ${process.env.NODE_ENV}`);
  console.log(decor.repeat(36) + ` \n`);
}
bootstrap();
