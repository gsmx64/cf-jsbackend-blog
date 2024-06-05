import { NestFactory, Reflector } from '@nestjs/core';
import { ClassSerializerInterceptor, ValidationPipe } from '@nestjs/common';
import { SwaggerModule, DocumentBuilder } from '@nestjs/swagger';
import * as session from 'express-session';
import * as morgan from 'morgan';
import { setDefaultResultOrder } from "dns";

import { AppModule } from './app.module';
import { CORS } from './constants';


/**
 * The main entry point of the application.
 * Initializes the NestJS application, sets up middleware, global pipes, interceptors, and CORS.
 * Configures the Swagger documentation for the API.
 * Starts the application server and logs the app URL and environment.
 */
async function bootstrap() {
  const app = await NestFactory.create(AppModule, {
    cors: true
  });
  
  setDefaultResultOrder("ipv4first");

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

  const config = new DocumentBuilder()
    .setTitle('CF-Blog API')
    .setDescription('CF Blog API description for JS In Backend Bootcamp')
    .setVersion('1.0')
    .addBearerAuth(
      {
        type: 'apiKey',
        name: 'access_token',
        description: 'Enter JWT token',
        in: 'header',
      },
      'access_token',
    )
    .build();
  const document = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('docs', app, document, {
    swaggerOptions: {
        persistAuthorization: true,
    },
  });

  await app.listen(process.env.APP_PORT, '0.0.0.0');

  var decor = '-';
  var appUrl = `http://${process.env.APP_HOST}:${process.env.APP_PORT}/`
  console.log(` \n` + decor.repeat(36));
  console.log(` >>> APP URL: ${appUrl}`);
  console.log(` >>> ENVIRONMENT: ${process.env.NODE_ENV}`);
  console.log(decor.repeat(36) + ` \n`);
}

bootstrap();