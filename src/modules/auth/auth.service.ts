import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';

@Injectable()
export class AuthService {
  constructor(private configService: ConfigService) {}

  validateToken(token: string): boolean {
    return token === this.configService.getOrThrow('auth.token');
  }
}
