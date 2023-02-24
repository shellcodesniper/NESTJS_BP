import { NestFactory } from '@nestjs/core';
import { Logger, ValidationPipe } from '@nestjs/common';
import { AppModule } from './app.module';
import { SwaggerModule, DocumentBuilder } from '@nestjs/swagger';
import cookieParser from 'cookie-parser';
import bodyParser from 'body-parser';
import 'reflect-metadata';
import { utilities as nestWinstonModuleUtilities, WinstonModule } from 'nest-winston';
import winston from 'winston';
import TransformInterceptor from './interceptors/transform.interceptor';
import { ConfigService } from '@nestjs/config';
// import CloudWatchTransport from 'winston-cloudwatch'; // NOTE : CLOUD WATCH LOGGING

process.env.NODE_ENV = (process.env.NODE_ENV || 'development').trim().toLowerCase();
process.env.TZ = 'Asia/Seoul';
process.env.VERSION = `v${process.env.npm_package_version || process.env.APP_VERSION || '0.0.0'}`;
console.log(process.env.npm_package_version);
process.on('SIGINT', () => {
  console.warn('\nGracefully shutting down from SIGINT (Ctrl-C)');
  process.exit(0);
})

const IS_PRODUCTION: boolean = process.env.NODE_ENV === 'production';
const URL: string = IS_PRODUCTION ? 'https://ql.gl' : 'http://localhost:3000';
const LOG_LEVEL: string = IS_PRODUCTION ? 'info' : 'debug';

// const CLOUD_WATCH_LOG_GROUP_NAME: string = IS_PRODUCTION ? 'production' : 'development';
// const CLOUD_WATCH_STREAM_NAME: string = '';
// const CLOUD_WATCH_ACCESS_KEY_ID: string = '';
// const CLOUD_WATCH_SECRET_ACCESS_KEY: string = '';
// const CLOUD_WATCH_LOG_LEVEL: string = IS_PRODUCTION ? 'debug' : 'debug';
// NOTE : CLOUD WATCH LOGGING

async function bootstrap() {
  const app = await NestFactory.create(AppModule, {
    cors: {
      origin: URL,
      credentials: true,
      methods: 'GET,POST,PATCH,DELETE,HEAD,OPTIONS',
    },
    logger: WinstonModule.createLogger({
      format: winston.format.uncolorize(),
      transports: [
        new winston.transports.Console({
          level: LOG_LEVEL,
          format: winston.format.combine(
            winston.format.timestamp(),
            winston.format.simple(),
            nestWinstonModuleUtilities.format.nestLike(),
          ),
        }),
        // new CloudWatchTransport({
        //   name: 'Cloudwatch Logs',
        //   level: CLOUD_WATCH_LOG_LEVEL,
        //   logGroupName: CLOUD_WATCH_LOG_GROUP_NAME,
        //   logStreamName: CLOUD_WATCH_STREAM_NAME,
        //   awsAccessKeyId: CLOUD_WATCH_ACCESS_KEY_ID,
        //   awsSecretKey: CLOUD_WATCH_SECRET_ACCESS_KEY,
        //   awsRegion: 'ap-northeast-2',
        //   messageFormatter: (item: any) => (`${item.level}:  ${item.message} ${JSON.stringify(item.meta)}`),
        // }),
        // NOTE : CLOUD WATCH LOGGING
      ],
    }),
    rawBody: true,
  });

  const configService = app.get(ConfigService);

  const http = configService.get('http');
  console.log(http);

  app.enableShutdownHooks();

  app.enableCors({
    origin: URL,
    credentials: true,
    methods: 'GET,POST,PATCH,DELETE,HEAD,OPTIONS',
  });
  app.use(bodyParser.json({ limit: '1mb' }));
  app.use(bodyParser.urlencoded({ limit: '1mb', extended: true }));
  app.use(cookieParser());
  // NOTE : CLOUDFLARE Limit 50MB

  app.useGlobalInterceptors(new TransformInterceptor());

  app.useGlobalPipes(
    new ValidationPipe({
      transform: true,
      disableErrorMessages: IS_PRODUCTION, // NOTE : disable Error When Production
    })
  );

  const documentSetting = new DocumentBuilder()
    .setTitle('D-OCEAN')
    .setDescription('CaramellaTeam')
    .setVersion(process.env.VERSION || '0.0.0')
    .build();
  const document = SwaggerModule.createDocument(app, documentSetting);
  SwaggerModule.setup('docs', app, document);


  await app.listen(3000);
}
Logger.log(`NODE_ENV: ${process.env.NODE_ENV}`);
bootstrap();
