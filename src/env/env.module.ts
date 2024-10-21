import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import config from './parse';

@Module({
  imports: [
    ConfigModule.forRoot({
      envFilePath: `.env`,
      isGlobal: true,
      load: [config],
    }),
  ],
})
export class EnvModule {}
