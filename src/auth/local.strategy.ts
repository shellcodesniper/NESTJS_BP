import { Injectable, Logger } from '@nestjs/common';
import { PassportStrategy } from '@nestjs/passport';
import { AuthService } from './auth.service';
import { Strategy } from 'passport-local';
import { KError, HttpStatus } from '@error/error.handler';

@Injectable()
export class LocalStrategy extends PassportStrategy(Strategy) {
  constructor(private authService: AuthService) {
    super();
  }

  async validate(username: string, password: string): Promise<any> {
    Logger.debug('Validate user');
    const user = await this.authService.validateUser(username, password);
    if (!user) {
      throw new KError('Invalid username or password', HttpStatus.UNAUTHORIZED);
    }
    return user;
  }
}
