// import { APP_FILTER } from '@nestjs/core';
import {
  Logger, MiddlewareConsumer,
  Module, NestModule,
} from '@nestjs/common';

import { ConfigModule, ConfigService } from '@nestjs/config';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { configLoaders } from './config/';
import { CaptureRequestMiddleware } from './middlewares/capture.middleware';
import { AuthModule } from './auth/auth.module';
import { UsersModule } from './users/users.module';
// import GlobalExceptionFilter from './filters/global_exception.filter';


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
    // {
    //   provide: APP_FILTER,
    //   useClass: GlobalExceptionFilter,
    // },
    AppService,
    ConfigService,
  ],
})
export class AppModule implements NestModule {
  private readonly logger = new Logger(AppModule.name);
  constructor(
    private readonly configService: ConfigService,
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
