import { registerAs } from '@nestjs/config';
import * as yaml from 'js-yaml';
import fs from 'fs';
import path from 'path';

// NOTE : DEFAULT_ENV_PATH

const BASE_PATH: string = path.join(__dirname, 'config'); // NOTE : CONFIG FOLDER PATH
const ENV_PATH: string = path.join(BASE_PATH, process.env.NODE_ENV === 'production'
? '.prod.yaml' : '.dev.yaml');

const parsedEnv = yaml.load(fs.readFileSync(ENV_PATH, 'utf-8')) as Record<string, any>;
const logEnv = parsedEnv.log as Record<string, any>;

export interface IRootEnv {
  port: number;
}

export default registerAs(
  'root', // TYPE : REGISTER AS THIS NAME
  (): IRootEnv => ({
  port: parseInt(logEnv.PORT || '', 10) || 3000,
}));
