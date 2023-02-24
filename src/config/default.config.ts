import { registerAs } from '@nestjs/config';
import * as yaml from 'js-yaml';
import fs from 'fs';
import path from 'path';

// NOTE : DEFAULT_ENV_PATH

const BASE_PATH: string = path.join(__dirname, 'config'); // NOTE : CONFIG FOLDER PATH
console.log(`BASE_PATH: ${BASE_PATH}`);
const ENV_PATH: string = path.join(BASE_PATH, process.env.NODE_ENV === 'production'
? '.prod.yaml' : '.dev.yaml');

const parsedEnv = yaml.load(fs.readFileSync(ENV_PATH, 'utf-8')) as Record<string, any>;
console.log(parsedEnv);

export interface IDefaultEnv {
  port: number;
}

export default registerAs('default', (): IDefaultEnv => ({
  port: parseInt(parsedEnv.PORT || '', 10) || 3000,
}));
