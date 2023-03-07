import { Module } from '@nestjs/common';
import { UsersModule } from '@src/users/users.module';
import { PassportModule } from '@nestjs/passport';

import { AuthService } from './auth.service';
import { LocalStrategy } from './local.strategy';

import { JwtModule } from '@nestjs/jwt';
// import { IAppEnv, IJWTEnv } from '@config/index';
import { ConfigModule } from '@nestjs/config';
import { AccessTokenStrategy } from './accessToken.strategy';
import { RefreshTokenStrategy } from './refreshToken.strategy';
import { AuthController } from './auth.controller';

@Module({
  imports: [
    UsersModule, PassportModule,
    ConfigModule,
    JwtModule.register({}),
    // JwtModule.registerAsync({
    //   imports: [ConfigModule],
    //   useFactory: async (configService: ConfigService) => {
    //     const appConfig = configService.get<IAppEnv>('app')!;
    //     const jwtConfig = configService.get<IJWTEnv>('jwt')!;
    //     const accessConfig = jwtConfig.accessToken;
    //
    //     return {
    //       secret: accessConfig.secretOrPrivateKey,
    //       signOptions: {
    //         algorithm: accessConfig.signOptions.algorithm as any,
    //         expiresIn: accessConfig.signOptions.expiresIn,
    //         issuer: appConfig.host,
    //         encoding: 'utf8',
    //       },
    //     };
    //   },
    //   inject: [ConfigService],
    // }),
  ],
  controllers: [
    AuthController,
  ],
  providers: [
    AuthService, LocalStrategy, AccessTokenStrategy, RefreshTokenStrategy,
  ],
  exports: [AuthService],
})
export class AuthModule {}
