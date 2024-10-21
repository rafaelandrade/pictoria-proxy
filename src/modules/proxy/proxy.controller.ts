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

@Controller('proxy')
export class ProxyController {
  constructor(private readonly authService: AuthService) {}

  @Post('/image')
  async getImage(
    @Body('url') url: string,
    @Headers('authorization') authHeader: string,
    @Res() res: Response,
  ) {
    if (!authHeader || !authHeader.startsWith('Bearer ')) {
      throw new HttpException('Unauthorized', HttpStatus.UNAUTHORIZED);
    }

    const token = authHeader.split(' ')[1];

    if (!this.authService.validateToken(token)) {
      throw new HttpException('Unauthorized', HttpStatus.UNAUTHORIZED);
    }

    try {
      const response = await axios.get(url);
      res.set('Content-Type', response.headers['content-type']);
      res.send(response.data);
    } catch (error: any) {
      throw new HttpException(
        `Error downloading image ${error}`,
        HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
  }
}
