import {
  Controller, Get, HttpStatus, Post,
  Request, UseGuards,
} from '@nestjs/common';
import type express from 'express';
import { LocalAuthGuard } from './local-auth.guard';
import { AccessTokenGuard } from './accessToken.guard';
// import { RefreshTokenGuard } from './refreshToken.guard';
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
    const authData = await this.authService.signIn(req.user);

    return RetType.new<Record<string, string>>()
      .setData({ ...authData })
      .setHttpStatus(HttpStatus.ACCEPTED);
  }

  @UseGuards(AccessTokenGuard)
  @Get('/test')
  getProfile(@Request() req: express.Request): RetType<Record<string, any>> {
    return RetType.new<Record<string, string>>()
      .setData({ ...req.user })
      .setHttpStatus(HttpStatus.ACCEPTED);
  }

}
