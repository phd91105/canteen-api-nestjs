import { InternalServerErrorException, ValidationPipe } from '@nestjs/common';
import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { setUp } from './app.service';

function throwError(error: Error): never {
  throw new InternalServerErrorException(error);
}

async function bootstrap(): Promise<void> {
  const app = await NestFactory.create(AppModule, { cors: true });
  app.useGlobalPipes(new ValidationPipe());
  setUp(app).catch(throwError);
}

bootstrap();
