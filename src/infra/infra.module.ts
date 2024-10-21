import { Module } from '@nestjs/common';
import { EnvModule } from '../env/env.module';

import { ThrottlerModule, seconds, ThrottlerGuard } from '@nestjs/throttler';
import { APP_GUARD } from '@nestjs/core';

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
    {
      provide: APP_GUARD,
      useClass: ThrottlerGuard,
    },
  ],
})
export class InfraModule {}
