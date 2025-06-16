import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import * as pkg from '../package.json';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  const config = new DocumentBuilder()
    .setTitle(pkg.displayName)
    .setDescription(pkg.description)
    .setVersion(pkg.version)
    .addServer('http://127.0.1:3000', 'Url de desenvolvimento')
    .addBearerAuth()
    .setContact(pkg.author,"https://github.com/Eduardo-Ohlweiler/","ohlweilereduardo@gmail.com")
    .build();

  const documentFactory = () => SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('docs', app, documentFactory);

  await app.listen(process.env.PORT ?? 3000);
}
void bootstrap();
