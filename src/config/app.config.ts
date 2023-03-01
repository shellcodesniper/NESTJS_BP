import { registerAs } from '@nestjs/config';
import * as yaml from 'js-yaml';
import fs from 'fs';
import path from 'path';
import { IAppEnv } from '.';

// NOTE : DEFAULT_ENV_PATH

const BASE_PATH: string = path.join(__dirname, 'config'); // NOTE : CONFIG FOLDER PATH
const ENV_PATH: string = path.join(BASE_PATH, process.env.NODE_ENV === 'production'
? '.prod.yaml' : '.dev.yaml');

const parsedEnv = yaml.load(fs.readFileSync(ENV_PATH, 'utf-8')) as Record<string, any>;
const appEnv = parsedEnv.app as Record<string, any>;


export default registerAs(
  'app', // TYPE : REGISTER AS THIS NAME
  (): IAppEnv => {
    const host: string = appEnv.host || 'localhost';
    const port: number = parseInt(appEnv.port || '3000', 10);
    const urlPrefix: string = appEnv.https || false ? 'https' : 'http';
    const urlSuffix: string = (port == 80 || port == 443) ? '' : `:${appEnv.port}`;
    const hostUrl: string = `${urlPrefix}://${host}${urlSuffix}/`;
    const version: string = `v${(process.env.VERSION || '0.0.0').replace('v', '')}`;
    const packageName: string = process.env.npm_package_name || 'ql.gl';
    const packageDescription: string = process.env.npm_package_description || 'https://ql.gl';

    return {
      packageName,
      packageDescription,
      isProduction: process.env.NODE_ENV === 'production',
      hostUrl,
      corsOrigin: appEnv.corsOrigin || hostUrl,
      port,
      https: appEnv.https || false,
      host,
      version,
    } as IAppEnv;
  }
);

