import { INestApplication } from '@nestjs/common';
import helmet from 'helmet';
import { customLogger, LoggerService } from '../helpers';

export function setMiddlewares<T = any>(app: INestApplication<T>) {
  app.useLogger(new LoggerService());
  app.enableCors({ origin: '*' });
  app.use(customLogger.setContextMiddleware);
  app.useLogger(app.get(LoggerService));
  app.use(helmet());
}
