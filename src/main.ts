import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import * as pkg from '../package.json';
import {ValidationPipe} from '@nestjs/common';

async function bootstrap() {
  const porta = process.env.PORT ?? 3000;
  const app = await NestFactory.create(AppModule);
  app.enableCors();
  app.useGlobalPipes(new ValidationPipe({
    transform: true,
    whitelist: true
  }));

  const config = new DocumentBuilder()
    .setTitle(pkg.displayName)
    .setDescription(pkg.description)
    .setVersion(pkg.version)
    .addServer(`http://127.0.1:${porta}`, 'Url de desenvolvimento')
    .addBearerAuth()
    .setContact(pkg.author,"https://github.com/Eduardo-Ohlweiler/","ohlweilereduardo@gmail.com")
    .build();

  const documentFactory = () => SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('docs', app, documentFactory);

  await app.listen(porta);
}
void bootstrap();
