import { Injectable, NestInterceptor, ExecutionContext, CallHandler, Logger } from '@nestjs/common';
import { Observable } from 'rxjs';
import { ConfigService } from '@nestjs/config';
import { map } from 'rxjs/operators';
import { RetType } from '$type/ret';
import { ILogEnv } from '@src/config';
import { KError } from '@src/utils/error.handler';

@Injectable()
class TransformInterceptor<T> implements NestInterceptor<T, RetType<T>> {
  captureResponse: boolean = false;

  constructor(private configService: ConfigService) {
    const logConfig = this.configService.get<ILogEnv>('log')!;
    this.captureResponse = logConfig.captureResponse;
  }
  intercept(context: ExecutionContext, next: CallHandler): Observable<RetType<T>> {
    return next.handle().pipe(
      map((data: RetType<any> | any) => {
        if (data instanceof RetType) {
          const body: any = data.getBody();

          context.switchToHttp()
          .getResponse()
          .status(data.getHttpStatusCode());

          if (this.captureResponse) {
            Logger.debug(
              '\n======================= Response: =======================\n'
                + `[${context.switchToHttp().getResponse().statusCode as number}]\n`
                + `\n${JSON.stringify(body, null, 2)}\n`
                + '===================== End Response ======================\n\n'
            );
          }
          return body;
        }

        throw new KError('INTERNAL_SERVER_ERROR', 500, 'Internal Server Error', {})
      }),
    );
  }
}

export default TransformInterceptor;
