/**
 * [*** IMPORTANT! ***] Do not use this seed file in production.
 */

import { NestFactory } from '@nestjs/core';
import { AppModule } from '../src/app.module';
import { seedData } from './seed-data';
import pino from 'pino';

const logger = pino();

async function bootstrap() {
  const appContext = await NestFactory.createApplicationContext(AppModule);

  logger.info('Seeding admin users...');
  //TODO: add seed logic here
  logger.info(seedData);
  logger.info('Database Seeding Started');

  await appContext.close();
}

bootstrap()
  .then(() => {
    logger.info('Seeding completed!');
  })
  .catch((err) => {
    logger.error('Seeding failed:', err);
    process.exit(1);
  });
