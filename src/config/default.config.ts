import { registerAs } from '@nestjs/config';
import * as yaml from 'js-yaml';
import fs from 'fs';
import path from 'path';
import { IDefaultEnv } from '.';
// NOTE : DEFAULT_ENV_PATH


const BASE_PATH: string = path.join(__dirname, 'config'); // NOTE : CONFIG FOLDER PATH
const ENV_PATH: string = path.join(BASE_PATH, process.env.NODE_ENV === 'production'
? '.prod.yaml' : '.dev.yaml');
const parsedEnv = yaml.load(fs.readFileSync(ENV_PATH, 'utf-8')) as any;


export default registerAs(
  'default', // TYPE : REGISTER AS THIS NAME
  (): IDefaultEnv => ({ ...parsedEnv, })
);
// NOTE : DEFAULT ENV Loading as 'default'
