import { NestFactory, Reflector } from '@nestjs/core';
import { AppModule } from './app.module';
import { ConfigService } from '@nestjs/config';
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
  var appUrl = `http://${configService.get('APP_HOST')}:${configService.get('APP_PORT')}/`
  console.log(` \n` + decor.repeat(36));
  console.log(` >>> APP PORT: ` + configService.get('APP_PORT'));
  console.log(` >>> APP URL: ${appUrl}`);
  console.log(decor.repeat(36) + ` \n`);
}
bootstrap();
