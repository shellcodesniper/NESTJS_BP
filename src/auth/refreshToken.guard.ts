import {
  ExecutionContext,
  Injectable,
  UnauthorizedException,
} from '@nestjs/common';
import { Reflector } from '@nestjs/core';
import { AuthGuard } from '@nestjs/passport';
import { IS_PUBLIC_KEY } from '@common/decorators/public.decorator';

@Injectable()
export class RefreshTokenGuard extends AuthGuard('refresh-jwt') {
  constructor(private reflector: Reflector) {
    super();
  }

  async canActivate(context: ExecutionContext): Promise<boolean> {
    // Add your custom authentication logic here
    // for example, call super.logIn(request) to establish a session.
    console.log(context);
    console.log('check jwt auth guard');
    const parentCanActivate = (await super.canActivate(context)) as boolean;
    const isPublic = this.reflector.getAllAndOverride<boolean>(IS_PUBLIC_KEY, [
      context.getHandler(),
      context.getClass(),
    ]);

    return parentCanActivate || isPublic;
  }

  handleRequest(err: any, user: any, _info: any) {
    // You can throw an exception based on either "info" or "err" arguments
    if (err || !user) {
      throw err || new UnauthorizedException();
    }
    return user;
  }
}

