import { Logger } from '@nestjs/common';
import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';

(async (): Promise<void> => {
  const app = await NestFactory.create(AppModule);
  const logger = new Logger();
  const options = new DocumentBuilder()
    .setTitle('Cantin API NestJS')
    .setVersion('0.0.1')
    .addBearerAuth()
    .build();
  const document = SwaggerModule.createDocument(app, options);
  SwaggerModule.setup('docs', app, document);
  app.enableCors();
  await app.listen(process.env.PORT || 8080);
  logger.log(`${await app.getUrl()}/docs`);
})();
