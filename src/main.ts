import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ConfigService } from '@nestjs/config';
import { ValidationPipe } from '@nestjs/common';
import { SwaggerModule, DocumentBuilder } from '@nestjs/swagger';
import { Logger, LoggerErrorInterceptor } from 'nestjs-pino';
import * as cookieParser from 'cookie-parser';
import { version } from '../package.json';

async function bootstrap() {
  const app = await NestFactory.create(AppModule, { bufferLogs: true });

  const config: ConfigService = app.get(ConfigService);

  const logger = app.get(Logger);
  app.useLogger(logger);
  app.useGlobalInterceptors(new LoggerErrorInterceptor());

  app.useGlobalPipes(
    new ValidationPipe({
      whitelist: true,
      transform: true,
    }),
  );

  app.use(cookieParser());

  app.enableCors({
    origin: ['http://localhost:3000'],
    credentials: true,
  });

  const swaggerConfig = new DocumentBuilder()
    .setTitle('Braintree Paypal Integration - API')
    .setDescription(
      `Braintree Paypal Integration - API. It is currently using ${await config.get(
        'APP_ENV',
      )} environment.`,
    )
    .setVersion(version)
    .addBearerAuth({ type: 'http', scheme: 'bearer', bearerFormat: 'JWT' })
    .build();

  const document = SwaggerModule.createDocument(app, swaggerConfig);
  SwaggerModule.setup('docs', app, document, {
    customSiteTitle: 'Braintree Paypal Integration - API',
  });

  await app.listen(await config.get('PORT'), async () =>
    logger.log(
      `Server started on port: ${await config.get('PORT')}...`,
      'main.ts',
    ),
  );
}
bootstrap();
