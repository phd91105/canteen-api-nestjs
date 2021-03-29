import { Logger } from '@nestjs/common';
import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  const logger = new Logger();

  const options = new DocumentBuilder().setTitle('CanTin API').build();

  const document = SwaggerModule.createDocument(app, options);
  SwaggerModule.setup('v1/docs', app, document);

  await app.listen(process.env.PORT || 8080);
  logger.log(`Server is running in ${await app.getUrl()}`);
}
bootstrap();
