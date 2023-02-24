import {
  ExceptionFilter, Catch,
  ArgumentsHost,
} from '@nestjs/common';
import { Request, Response } from 'express';

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
  catch(exception: any, host: ArgumentsHost) {
    const ctx = host.switchToHttp();
    const response = ctx.getResponse<Response>();
    const request = ctx.getRequest<Request>();
    const status = exception.getStatus ? exception.getStatus() : 500;

    const exceptionResponse = exception.getResponse ? exception.getResponse() : 'NO RESPONSE';

    if (exception.response) {
      response
        .status(status)
        .json({
          cd: status,
          err: (exception.response && exception.response.error)
            ? exception.response.error
            : exception.message,
          message: (exception.response && exception.response.message)
            ? exception.response.message
            : exception.message,
          timestamp: convertPrettyKST(new Date()),
          path: request.url,
        });
    } else {
      response
        .status(status)
        .json({
          cd: status,
          err: (exception.message) ? exception.message : '',
          msg: (exceptionResponse && exceptionResponse.error)
            ? exceptionResponse.error : exception.message,
          ext: {
            timestamp: convertPrettyKST(new Date()),
            path: request.url,
          },
        });
    }
  }
}

export default GlobalExceptionFilter;
