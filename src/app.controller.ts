import {
  Controller, Get,
} from '@nestjs/common';
import { RetType, HttpStatus } from './@types/ret';
import { AppService } from './app.service';
import { PublicEndpoint } from './decorators/public.decorator';
// import { KError } from './utils/error.handler';

@Controller()
export class AppController {
  constructor(private readonly appService: AppService) {}

  @PublicEndpoint()
  @Get()
  getHello(): RetType<Record<string, string>> {
    // throw new KError('TEST ERROR', 400, 'error string', {});
    // throw new UnauthorizedException();

    return RetType.new<Record<string, string>>()
      .setData({ version: this.appService.getVersion() })
      .setHttpStatus(HttpStatus.ACCEPTED);
    
  }
}
