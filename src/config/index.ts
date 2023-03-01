import { default as defaultConfig } from './default.config';
import { default as appConfig } from './app.config';
import { default as logConfig } from './log.config';
import { default as jwtConfig } from './jwt.config';
import { default as rateLimitConfig } from './ratelimit.config';

export interface IDefaultEnv {
  app: IAppEnv;                   // TYPE : APP
  log: ILogEnv;                   // TYPE : LOGGING
  jwt: IJWTEnv;
}

export interface IAppEnv {
  isProduction: boolean;          // TYPE : IS PRODUCTION?
  packageName: string;            // TYPE : PACKAGE NAME
  packageDescription: string;     // TYPE : PACKAGE DESCRIPTION
  host: string;                   // TYPE : HOST NAME
  hostUrl: string;                // TYPE : HOST URL
  corsOrigin: string | string[];  // TYPE : CORS ORIGIN URL OR ARRAY OF URLS
  port: number;                   // TYPE : PORT NUMBER
  https: boolean;                 // TYPE : HTTPS ENABLED?
  version: string;                // TYPE : APP VERSION
}

export interface IRateLimitEnv {
  ttl: number;                    // TYPE : TIME TO LIVE
  limit: number;                  // TYPE : LIMIT
}

export interface ILogEnv {
  level: string;                  // TYPE : LOG LEVEL

  captureRequest: boolean;        // TYPE : CAPTURE REQUEST?
  captureResponse: boolean;       // TYPE : CAPTURE RESPONSE?

  cloudwatch: {                   // TYPE : CLOUDWATCH LOGGING
    enabled: boolean;             // TYPE : ENABLED?
    loggerName: string;           // TYPE : LOGGER NAME
    logGroupName: string;         // TYPE : LOG GROUP NAME
    logStreamName: string;        // TYPE : LOG STREAM NAME
    awsAccessKeyId: string;       // TYPE : AWS ACCESS KEY ID
    awsSecretKey: string;         // TYPE : AWS SECRET KEY
    log_level: string;            // TYPE : LOG LEVEL
  };
}

export interface IJWTEnv {
  accessToken: IJWTOption;        // TYPE : ACCESS TOKEN
  refreshToken: IJWTOption;       // TYPE : REFRESH TOKEN
}

export interface IJWTOption {
  secretOrPrivateKey: string;     // TYPE : SECRET OR PRIVATE KEY
  signOptions: {                  // TYPE : SIGN OPTIONS
    algorithm: string;            // TYPE : ALGORITHM
    expiresIn: number;            // TYPE : EXPIRES IN
  };
}


export const configLoaders = [
  defaultConfig,
  appConfig,
  logConfig,
  jwtConfig,
  rateLimitConfig,
];

export {
  defaultConfig,
  appConfig,
  logConfig,
  jwtConfig,
  rateLimitConfig,
}
