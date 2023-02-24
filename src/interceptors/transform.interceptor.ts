import { Injectable, NestInterceptor, ExecutionContext, CallHandler, Logger } from '@nestjs/common';
import { Observable } from 'rxjs';
import { ConfigService } from '@nestjs/config';
import { map } from 'rxjs/operators';
import { RetType } from '$type/ret';
import { ILogEnv } from '@src/config';

@Injectable()
class TransformInterceptor<T> implements NestInterceptor<T, RetType<T>> {
  captureResponse: boolean = false;

  constructor(private configService: ConfigService) {
    const logConfig = this.configService.get<ILogEnv>('log')!;
    this.captureResponse = logConfig.captureResponse;
  }
  intercept(context: ExecutionContext, next: CallHandler): Observable<RetType<T>> {
    return next.handle().pipe(
      map((data: RetType<any> | string) => {
        const dat: RetType<any> =
          typeof data === 'string'
            ? {
                cd: context.switchToHttp().getResponse().statusCode as number,
                msg: data,
                dat: undefined,
                err: undefined,
              }
            : {
                cd: context.switchToHttp().getResponse().statusCode as number,
                msg: data.msg || undefined,
                dat: data.dat || { ...data } || undefined,
                err: undefined,
                ext: data.ext || undefined,
                // ...data,
              };

        if (this.captureResponse) {
          Logger.debug(
            '\n======================= Response: =======================\n'
            + `[${context.switchToHttp().getResponse().statusCode as number}]\n`
            + `\n${JSON.stringify(dat, null, 2)}\n`
            + '===================== End Response ======================\n\n'
          );
        }
        return dat;
      }),
    );
  }
}

export default TransformInterceptor;
