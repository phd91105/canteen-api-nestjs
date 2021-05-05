import { INestApplication } from '@nestjs/common';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import AppConfiguration from './config/app.config';

export const setUp = async (app: INestApplication): Promise<void> => {
  const swaggerOptions = new DocumentBuilder()
    .setTitle('Cantin API NestJS')
    .setVersion('0.0.1')
    .addBearerAuth()
    .build();
  const document = SwaggerModule.createDocument(app, swaggerOptions);
  SwaggerModule.setup('docs', app, document);
  await app.listen(AppConfiguration.port);
};
