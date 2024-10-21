import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { setMiddlewares } from './infra/infra.helpers';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  setMiddlewares(app);
  await app.listen(8080);
}

bootstrap();
