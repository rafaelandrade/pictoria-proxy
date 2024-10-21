import { Module } from '@nestjs/common';
import { InfraModule } from './infra/infra.module';
import { AuthModule } from './modules/auth/auth.module';
import { ProxyModule } from './modules/proxy/proxy.module';

@Module({
  imports: [InfraModule, AuthModule, ProxyModule],
  controllers: [],
  providers: [],
})
export class AppModule {}
