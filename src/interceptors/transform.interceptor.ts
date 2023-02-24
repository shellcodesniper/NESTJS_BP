import { Injectable, NestInterceptor, ExecutionContext, CallHandler, Logger } from '@nestjs/common';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

const IS_PRODUCTION = process.env.NODE_ENV === 'production';

import { RetType } from '$type/ret';

@Injectable()
class TransformInterceptor<T> implements NestInterceptor<T, RetType<T>> {
  intercept(context: ExecutionContext, next: CallHandler): Observable<RetType<T>> {
    return next.handle().pipe(
      map((data: RetType<any> | string) => {
        const dat: RetType<any> =
          typeof data === 'string'
            ? {
                cd: context.switchToHttp().getResponse().statusCode as number,
                msg: data,
                dat: null,
                err: null,
              }
            : {
                cd: context.switchToHttp().getResponse().statusCode as number,
                msg: data.msg || null,
                dat: data.dat || null,
                err: null,
                // ...data,
              };

        if (IS_PRODUCTION) {
          Logger.debug(
            '======================= Development Response Transform =======================',
          );
          Logger.debug(`\n${JSON.stringify(dat, null, 2)}\n`);
          Logger.debug(
            '==============================================================================',
          );
        }
        return dat;
      }),
    );
  }
}

export default TransformInterceptor;
