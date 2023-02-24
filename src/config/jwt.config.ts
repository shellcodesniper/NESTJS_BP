import { registerAs } from '@nestjs/config';
import * as yaml from 'js-yaml';
import fs from 'fs';
import path from 'path';
import { IJWTEnv } from '.';

// NOTE : DEFAULT_ENV_PATH

const BASE_PATH: string = path.join(__dirname, 'config'); // NOTE : CONFIG FOLDER PATH
const ENV_PATH: string = path.join(BASE_PATH, process.env.NODE_ENV === 'production'
? '.prod.yaml' : '.dev.yaml');

const parsedEnv = yaml.load(fs.readFileSync(ENV_PATH, 'utf-8')) as Record<string, any>;
const jwtConfig = parsedEnv.jwt as Record<string, any>;
const accessConfig = jwtConfig.access_token as Record<string, any>;
const refreshConfig = jwtConfig.refresh_token as Record<string, any>;

export default registerAs(
  'jwt', // TYPE : REGISTER AS THIS NAME
  (): IJWTEnv=> ({
    accessToken: {
      secretOrPrivateKey: accessConfig.secret_or_private_key,
      signOptions: {
        algorithm: accessConfig.sign_option.algorithm,
        expiresIn: accessConfig.sign_option.expires_in,
      },
    },
    refreshToken: {
      secretOrPrivateKey: refreshConfig.secret_or_private_key,
      signOptions: {
        algorithm: refreshConfig.sign_option.algorithm,
        expiresIn: refreshConfig.sign_option.expires_in,
      },
    }
  }));


