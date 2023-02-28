import {
  Controller, Get,
} from '@nestjs/common';
import { AppService } from './app.service';
import { PublicEndpoint } from './decorators/public.decorator';
// import { KError } from './utils/error.handler';

@Controller()
export class AppController {
  constructor(private readonly appService: AppService) {}

  @PublicEndpoint()
  @Get()
  getHello(): string {
    // throw new KError('TEST ERROR', 400, 'error string', {});
    // throw new UnauthorizedException();
    return this.appService.getHello();
  }
}
