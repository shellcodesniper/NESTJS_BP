export interface IDefaultEnv {
  app: IAppEnv;                   // TYPE : APP
  log: ILogEnv;                   // TYPE : LOGGING
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

export interface ILogEnv {
  level: string;                  // TYPE : LOG LEVEL
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

import { default as defaultConfig } from './default.config';
import { default as appConfig } from './app.config';
import { default as logConfig } from './log.config';

export const configLoaders = [
  defaultConfig,
  appConfig,
  logConfig,
];

export {
  defaultConfig,
  appConfig,
  logConfig,
}
