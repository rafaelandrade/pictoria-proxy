import { AuthService } from '../auth';
import {
  Controller,
  Query,
  Res,
  Headers,
  HttpException,
  HttpStatus,
  Post,
  Body,
} from '@nestjs/common';
import axios from 'axios';
import { Response } from 'express';
import { customLogger } from '../../helpers';

@Controller('proxy')
export class ProxyController {
  private readonly logger = customLogger;
  constructor(private readonly authService: AuthService) {}

  @Post('/image')
  async getImage(
    @Body('url') url: string,
    @Headers('authorization') authHeader: string,
    @Res() res: Response,
  ) {
    if (!authHeader || !authHeader.startsWith('Bearer ')) {
      this.logger.info('[PROXY - GET IMAGE] Request not authorized!');
      throw new HttpException('Unauthorized', HttpStatus.UNAUTHORIZED);
    }

    const token = authHeader.split(' ')[1];

    if (!this.authService.validateToken(token)) {
      this.logger.info('[PROXY - GET IMAGE] Request not authorized!');
      throw new HttpException('Unauthorized', HttpStatus.UNAUTHORIZED);
    }

    try {
      const response = await axios.get(url);
      res.set('Content-Type', response.headers['content-type']);
      res.send(response.data);
    } catch (error: any) {
      this.logger.error('[PROXY - GET IMAGE] Failed in Get image');
      throw new HttpException(
        `Error downloading image ${error}`,
        HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
  }
}
