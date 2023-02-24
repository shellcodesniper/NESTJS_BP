import { registerAs } from '@nestjs/config';
import * as yaml from 'js-yaml';
import fs from 'fs';
import path from 'path';
import { ILogEnv } from '.';

// NOTE : DEFAULT_ENV_PATH

const BASE_PATH: string = path.join(__dirname, 'config'); // NOTE : CONFIG FOLDER PATH
const ENV_PATH: string = path.join(BASE_PATH, process.env.NODE_ENV === 'production'
? '.prod.yaml' : '.dev.yaml');

const parsedEnv = yaml.load(fs.readFileSync(ENV_PATH, 'utf-8')) as Record<string, any>;
const logEnv = parsedEnv.log as Record<string, any>;

export default registerAs(
  'log', // TYPE : REGISTER AS THIS NAME
  (): ILogEnv => ({
  level: logEnv.level || 'info',

  captureResponse: logEnv.capture_response || false,
  captureRequest: logEnv.capture_request || false,

  cloudwatch: {
    enabled: logEnv.cloudwatch.enabled || false,
    loggerName: logEnv.cloudwatch.name || 'cloudwatcher',
    logGroupName: logEnv.cloudwatch.log_group || 'development',
    logStreamName: logEnv.cloudwatch.log_stream || '',
    awsAccessKeyId: logEnv.cloudwatch.access_key || '',
    awsSecretKey: logEnv.cloudwatch.secret_key || '',
    log_level: logEnv.cloudwatch.log_level || 'debug',
  }
  
}));

