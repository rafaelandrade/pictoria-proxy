import { MiddlewareConsumer, Module } from '@nestjs/common';
import { EnvModule } from '../env/env.module';

import { ThrottlerModule, seconds, ThrottlerGuard } from '@nestjs/throttler';
import { APP_GUARD } from '@nestjs/core';
import { customLogger, LoggerService } from '../helpers';

export const setRequestIdMiddleware = (req, _res, next) => {
  customLogger.info(`${req.method} ${req.originalUrl}`, req.body);

  return next();
};

@Module({
  imports: [
    EnvModule,
    ThrottlerModule.forRoot([
      {
        ttl: seconds(60),
        limit: 20000,
      },
    ]),
  ],
  providers: [
    LoggerService,
    {
      provide: APP_GUARD,
      useClass: ThrottlerGuard,
    },
  ],
  exports: [LoggerService],
})
export class InfraModule {
  configure(consumer: MiddlewareConsumer) {
    consumer.apply(setRequestIdMiddleware).forRoutes('*');
  }
}
