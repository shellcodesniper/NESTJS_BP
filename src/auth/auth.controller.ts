import {
  Controller, Get, HttpStatus, Post,
  Request, UseGuards,
} from '@nestjs/common';
import type express from 'express';
import { LocalAuthGuard } from './local-auth.guard';
import { JwtAuthGuard } from './jwt-auth.guard';
import { AuthService } from './auth.service';
import { PublicEndpoint } from '@common/decorators/public.decorator';
import { RetType } from '@common/@types/return.type';

@Controller('/')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @PublicEndpoint()
  @UseGuards(LocalAuthGuard)
  @Post('/login')
  async login(@Request() req: any): Promise<RetType<Record<string, any>>> {
    const authData = await this.authService.login(req.user);

    return RetType.new<Record<string, string>>()
      .setData({ ...authData })
      .setHttpStatus(HttpStatus.ACCEPTED);
  }

  @UseGuards(JwtAuthGuard)
  @Get('/test')
  getProfile(@Request() req: express.Request): RetType<Record<string, any>> {
    return RetType.new<Record<string, string>>()
      .setData({ ...req.user })
      .setHttpStatus(HttpStatus.ACCEPTED);
  }

}
