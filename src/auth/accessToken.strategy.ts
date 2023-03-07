import { ExtractJwt, Strategy } from 'passport-jwt';
import { PassportStrategy } from '@nestjs/passport';
import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { IJWTEnv } from '@config/index';

@Injectable()
export class AccessTokenStrategy extends PassportStrategy(Strategy, 'jwt') {
  constructor(configService: ConfigService) {
    const jwtConfig = configService.get<IJWTEnv>('jwt')!;

    super({
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      ignoreExpiration: false,
      algorithms: [
        jwtConfig.accessToken.signOptions.algorithm as any,
      ],
      secretOrKey: jwtConfig.accessToken.secretOrPrivateKey, // NOTE: PRIVATE KEY / SECRET KEY 설정 해야함.
    });
  }

  async validate(payload: any) {
    return { userId: payload.sub, username: payload.username };
  }
}
