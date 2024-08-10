import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import { Logger } from '@nestjs/common';

import { GlobalExceptionFilter } from '@core/infrasctructure/filters/global-exception.filter';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  app.enableCors({
    origin: true,
    methods: ['GET', 'POST', 'PATCH', 'PUT', 'DELETE'],
  });
  app.setGlobalPrefix('api/v1/');
  app.useGlobalFilters(new GlobalExceptionFilter());

  const options = new DocumentBuilder()
    .setTitle('TEST ALEGRA')
    .setDescription('Documentación de para consumo de servicios API Rest')
    .setVersion('1.0.0')
    .addBearerAuth()
    .build();

  const document = SwaggerModule.createDocument(app, options);

  SwaggerModule.setup('/docs/api/v1', app, document, {
    swaggerOptions: {
      filter: true,
    },
  });

  await app.listen(process.env.PORT || 3000);
  Logger.log(`Conexión establecida por el puerto ${process.env.PORT ?? 3000}`);
}
bootstrap();
