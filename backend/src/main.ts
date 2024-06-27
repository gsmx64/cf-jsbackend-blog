import { NestFactory, Reflector } from '@nestjs/core';
import { ClassSerializerInterceptor, ValidationPipe } from '@nestjs/common';
import { SwaggerModule, DocumentBuilder } from '@nestjs/swagger';
import * as morgan from 'morgan';
//import * as ExpressSession from 'express-session';
//import { TypeormStore } from 'connect-typeorm';
import { setDefaultResultOrder } from "dns";

import { AppModule } from './app.module';
import { CORS } from './constants';
//import { AppDS } from './config/data.source';
//import { SessionEntity } from './config/session.entity';


/**
 * The main entry point of the application.
 * Initializes the NestJS application, sets up middleware, global pipes, interceptors, and CORS.
 * Configures the Swagger documentation for the API.
 * Starts the application server and logs the app URL and environment.
 */
async function bootstrap() {
  const app = await NestFactory.create(AppModule, {
    //logger: ['log', 'fatal', 'error', 'warn', 'debug'],
    //cors: true
  });
  
  setDefaultResultOrder("ipv4first");

  app.use(morgan('dev'));

  app.useGlobalPipes(
    new ValidationPipe({
      transform: true,
      transformOptions: {
        enableImplicitConversion: true,
      },
    }),
  );

  const reflector = app.get(Reflector);
  app.useGlobalInterceptors(new ClassSerializerInterceptor(reflector));

  /*await AppDS.initialize();
  const sessionRepo = AppDS.getRepository(SessionEntity);
  app.use(
    ExpressSession({
      resave: false,
      saveUninitialized: false,
      store: new TypeormStore({
        cleanupLimit: 2,
        limitSubquery: false, // If using MariaDB.
        ttl: 86400,
      }).connect(sessionRepo),
      secret: process.env.APP_AUTH_SECRET,
      cookie: {
        maxAge: 1000 * 604800, // 1 week
        sameSite: "none",
        secure: false,
        //sameSite: true,
        //secure: process.env.NODE_ENV === "production",
      }
    })
  );*/

  //const cookieParser = require("cookie-parser");
  //app.use(cookieParser());

  //(process.env.NODE_ENV === 'production') && app.enableCors(CORS);

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