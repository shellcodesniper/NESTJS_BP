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
        let dat: RetType<any> = 
          (
            typeof data === 'string'
              ? {
                err: undefined,
                msg: undefined,
                dat: data,
                ext: undefined,
              }
              : (data.dat && 'kvType' in data.dat && data.dat.kvType === 'KVType')
                ? {
                  ...data,
                  [data.dat.key]: data.dat.value,
                }
                : {
                  ...data,
                }
          );

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
