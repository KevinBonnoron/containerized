/**
 * This is not a production server yet!
 * This is only a minimal backend to get started.
 */

import { Logger, UnprocessableEntityException, ValidationPipe } from '@nestjs/common';
import { NestFactory } from '@nestjs/core';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';

import { AppModule } from './app/app.module';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  const config = new DocumentBuilder()
    .setTitle('Containerized API')
    .setDescription('The containerized API description')
    .setVersion('1.0')
    .addTag('environment', 'Environment infos')
    .addTag('docker', 'Docker infos')
    .addTag('docker containers', 'Docker containers')
    .addTag('docker events', 'Docker events')
    .addTag('docker images', 'Docker images')
    .addTag('docker volumes', 'Docker volumes')
    .build();
  const document = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('api', app, document);

  const globalPrefix = 'api';
  app
    .setGlobalPrefix(globalPrefix)
    .useGlobalPipes(
      new ValidationPipe({
        whitelist: true,
        transform: true,
        exceptionFactory(errors) {
          const result = errors.map((error) => ({
            property: error.property,
            message: error.constraints[Object.keys(error.constraints)[0]],
          }));
          return new UnprocessableEntityException(result);
        },
      })
    )
    .enableCors();

  const port = process.env.PORT || 3000;
  await app.listen(port);
  Logger.log(`🚀 Application is running on: http://localhost:${port}/${globalPrefix}`);
}

bootstrap();
