import {
  Controller, Get,
} from '@nestjs/common';
import { RetType, HttpStatus } from './@types/ret';
import { AppService } from './app.service';
import { PublicEndpoint } from './decorators/public.decorator';
// import { SkipThrottle } from '@nestjs/throttler';
import { KError } from './utils/error.handler';

// @SkipThrottle(true)
@Controller()
export class AppController {
  constructor(private readonly appService: AppService) {}

  @PublicEndpoint()
  @Get()
  getHello(): RetType<Record<string, string>> {
    throw new KError('Error NAME', 400, 'error description', { more: 'info' });
    // throw new UnauthorizedException();

    return RetType.new<Record<string, string>>()
      .setData({ version: this.appService.getVersion() })
      .setHttpStatus(HttpStatus.ACCEPTED);
    
  }
}
