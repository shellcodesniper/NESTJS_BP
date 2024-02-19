import {
  Logger,
  MiddlewareConsumer,
  Module, NestModule,
} from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';

import { AppController } from './app.controller';
import { AppService } from './app.service';
import { configLoaders, IRateLimitEnv } from '@common/config/index';
import { CaptureRequestMiddleware } from '@common/middlewares/capture.middleware';
import { AuthModule } from './auth/auth.module';
import { UsersModule } from './users/users.module';
import { APP_GUARD } from '@nestjs/core';
import { AccessTokenGuard } from './auth/accessToken.guard';
import { ThrottlerGuard, ThrottlerModule } from '@nestjs/throttler';
import { PrismaService } from '@db/prisma.service';
import { PostModule } from './post/post.module';


@Module({
  imports: [
    ConfigModule.forRoot({
      load: configLoaders,
    }),
    ThrottlerModule.forRootAsync({
      imports: [ConfigModule],
      useFactory: async (configService: ConfigService) => {
        const rateLimitConfig: IRateLimitEnv = configService.get<IRateLimitEnv>('rate-limit')!;
        return {
          ttl: rateLimitConfig.ttl,
          limit: rateLimitConfig.limit,
        };
      },
      inject: [ConfigService],
    }),
    AuthModule,
    UsersModule,
    PostModule,
  ],
  controllers: [
    AppController,
  ],
  providers: [
    {
      provide: APP_GUARD,
      useClass: AccessTokenGuard,
    },
    {
      provide: APP_GUARD,
      useClass: ThrottlerGuard,
    },
    AppService,
    ConfigService,
    PrismaService,
  ],
})
export class AppModule implements NestModule {
  private readonly logger = new Logger(AppModule.name);
  constructor(
    private readonly configService: ConfigService,
    // @ts-ignore UnusedLocals
    private readonly appService: AppService,
  ) {
  }

  configure(consumer: MiddlewareConsumer) {
    const middleware = new CaptureRequestMiddleware(
      this.logger,
      this.configService
    );
    consumer.apply(middleware.use.bind(middleware)).forRoutes('*');
    // NOTE : Request capture MiddleWare
  }
}
