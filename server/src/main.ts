import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';

export const GLOBAL_PREFIX = 'api';
export let getUrlApi: () => string;

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  app.setGlobalPrefix(GLOBAL_PREFIX);

  await app.listen(3000);
  const appUrl = await app.getUrl();

  getUrlApi = () => `${appUrl}/${GLOBAL_PREFIX}`;
  console.log(`Application is running on: ${appUrl}`);
}

bootstrap();
