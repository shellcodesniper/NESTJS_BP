import { Request } from 'express';
import { ExtractJwt, Strategy } from 'passport-jwt';
import { PassportStrategy } from '@nestjs/passport';
import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { IJWTEnv } from '@config/index';

@Injectable()
export class RefreshTokenStrategy extends PassportStrategy(Strategy, 'jwt-refresh') {
  constructor(configService: ConfigService) {
    const jwtConfig = configService.get<IJWTEnv>('jwt')!;

    super({
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      ignoreExpiration: false,
      algorithms: [
        jwtConfig.refreshToken.signOptions.algorithm as any,
      ],
      secretOrKey: jwtConfig.refreshToken.secretOrPrivateKey, // NOTE: PRIVATE KEY / SECRET KEY 설정 해야함.
      passReqToCallback: true,
    });
  }

  async validate(req: Request, payload: any) {
    const refreshToken = req.get('Authorization')?.replace('Bearer', '').trim();
    return { userId: payload.sub, username: payload.username, refreshToken };
  }
}

