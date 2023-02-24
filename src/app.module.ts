import {
  Logger,
  MiddlewareConsumer,
  Module, NestModule,
} from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';

import { AppController } from './app.controller';
import { AppService } from './app.service';
import { configLoaders } from './config/';
import { CaptureRequestMiddleware } from './middlewares/capture.middleware';
import { AuthModule } from './auth/auth.module';
import { UsersModule } from './users/users.module';
import { APP_GUARD } from '@nestjs/core';
import { JwtAuthGuard } from './auth/jwt-auth.guard';


@Module({
  imports: [
    ConfigModule.forRoot({
      load: configLoaders,
    }),
    AuthModule,
    UsersModule,
  ],
  controllers: [
    AppController,
  ],
  providers: [
    {
    provide: APP_GUARD,
      useClass: JwtAuthGuard,
    },
    AppService,
    ConfigService,
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
