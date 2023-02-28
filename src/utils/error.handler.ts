// NOTE : Custom Error Handler By Dogyun
import { HttpException, HttpStatus } from "@nestjs/common";

export const isUndefined = (obj: any): obj is undefined =>
  typeof obj === 'undefined';
export const isObject = (fn: any): fn is object =>
  !isNil(fn) && typeof fn === 'object';
export const validatePath = (path?: string): string =>
  path ? (path.charAt(0) !== '/' ? '/' + path : path) : '';
export const isFunction = (fn: any): boolean => typeof fn === 'function';
export const isString = (fn: any): fn is string => typeof fn === 'string';
export const isConstructor = (fn: any): boolean => fn === 'constructor';
export const isNil = (obj: any): boolean => isUndefined(obj) || obj === null;
export const isEmpty = (array: any): boolean => !(array && array.length > 0);
export const isSymbol = (fn: any): fn is symbol => typeof fn === 'symbol';

export interface IHttpExceptionBody {
  error?: string;
  message: string;
  ext: object;
}

export function createKErrorBody(
  message?: object | string,
  error?: string,
  detail?: object,
): IHttpExceptionBody {

  const msg = isString(message) ? message : JSON.stringify(message);

  return {
    error,
    message: msg,
    ext: detail || {},
  };
};

// NOTE : Custom Error 만들기



export class KError extends HttpException {
  detail: object;
  constructor(
    message?: string | object | any,
    statusCode: number = 400,
    error: string = 'Unauthorized',
    detail: object = {}
  ) {
    super(
      createKErrorBody(message, error, detail),
      statusCode,
    );
    this.detail = detail || {};
    console.log(this);
  }

  getErrorDetail() {
    return this.detail;
  }
}

export { HttpStatus };


// NOTE : Using Custom Error
// import KError;
// throw new KError('TEST ERROR', {}, 400);
