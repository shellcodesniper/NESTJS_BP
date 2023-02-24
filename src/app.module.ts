import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { ConfigModule } from '@nestjs/config';
import defaultConfig from './config/default.config';
import rootConfig from './config/root.config';


@Module({
  imports: [
    ConfigModule.forRoot({
      load: [
        defaultConfig,
        rootConfig,
      ]
    }),
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
