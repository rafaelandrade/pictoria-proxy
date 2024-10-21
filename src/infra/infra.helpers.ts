import { INestApplication, ValidationPipe } from '@nestjs/common';
import helmet from 'helmet';

export function setMiddlewares<T = any>(app: INestApplication<T>) {
  app.enableCors({ origin: '*' });
  app.use(helmet());
}
