// NOTE : Custom Error Handler By Dogyun
export class KError extends Error {
  statusCode: number;
  message: string;
  detail: object;
  constructor(msg: string, detail?: object, status?: number) {
    super(msg);
    this.statusCode = status || 400;
    this.message = msg || '';
    this.detail = detail || {};
  }

  getStatus() {
    return this.statusCode;
  }

  getErrorMsg() {
    return this.message;
  }

  getErrorDetail() {
    return this.detail;
  }
}


// NOTE : Using Custom Error
// import KError;
// throw new KError('TEST ERROR', {}, 400);
