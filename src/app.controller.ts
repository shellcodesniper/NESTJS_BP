import {
  Controller, Get,
} from '@nestjs/common';
import { AppService } from './app.service';
import { PublicEndpoint } from './decorators/public.decorator';

@Controller()
export class AppController {
  constructor(private readonly appService: AppService) {}

  @PublicEndpoint()
  @Get()
  getHello(): string {
    // throw new KError('TEST ERROR', {}, 400);
    return this.appService.getHello();
  }
}
