import {
  ExceptionFilter, Catch,
  ArgumentsHost, Logger,
} from '@nestjs/common';
import { HttpAdapterHost } from '@nestjs/core';
import type { Request } from 'express';
import { KError } from '@src/utils/error.handler';

function convertPrettyKST(time: string | number | Date, simple?: boolean): string {
  const dateObj = new Date(time);
  const date = `0${dateObj.getDate()}`.slice(-2);
  const month = `0${dateObj.getMonth() + 1}`.slice(-2);
  const year = dateObj.getFullYear();
  const hour = `0${dateObj.getHours()}`.slice(-2);
  const minute = `0${dateObj.getMinutes()}`.slice(-2);
  const second = `0${dateObj.getSeconds()}`.slice(-2);
  if (simple) {
    return `${year}${month}${date}_${hour}${minute}${second}`;
  }
  return `${year}-${month}-${date} ${hour}:${minute}:${second}`;
}

// NOTE : CATCH ERROR AND FILTER IT TO GENERALIZED RESPONSE!
@Catch()
class GlobalExceptionFilter implements ExceptionFilter {
  constructor(private readonly httpAdapterHost: HttpAdapterHost) {}

  catch(exception: any, host: ArgumentsHost) {

    const { httpAdapter } = this.httpAdapterHost;

    const ctx = host.switchToHttp();
    // const response = ctx.getResponse<Response>();
    const request = ctx.getRequest<Request>();

    const exceptionResponse = exception.getResponse ? exception.getResponse() : 'NO RESPONSE';
    const status = exception.getStatus ? exception.getStatus() : 400;
    let exceptionMessage = '';
    if (exception.response && exception.response.error) {
      exceptionMessage = exception.response.error;
    } else if (exception.message) {
      exceptionMessage = exception.message;
    } else if (exceptionResponse.error) {
      exceptionMessage = exceptionResponse.error;
    } else {
      exceptionMessage = 'UNKNOWN ERROR';
    }


    const responseBody = (exception instanceof KError)
      ? {
        cd: exception.getStatus(),
        err: exception.getErrorMsg(),
        ext: exception.getErrorDetail(),
      }
      : {
        cd: status,
        err: exceptionMessage,
        msg: exceptionMessage,
        ext: {
          timestamp: convertPrettyKST(new Date()),
          path: request.url,
        },
      };

      Logger.error(
        '\n======================= ERROR : =======================\n'
        + `[${status}]\n`
        + `\n${JSON.stringify(responseBody, null, 2)}\n`
        + '===================== End ERROR =======================\n\n'
      );
    httpAdapter.reply(ctx.getResponse(), responseBody, status);
  }
}

export default GlobalExceptionFilter;
