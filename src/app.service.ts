import { Injectable } from '@nestjs/common';

@Injectable()
export class AppService {
  getHello(): string {
    return 'Hello World!';
  }
  testError(): void {
    throw new Error('TEST ERROR');
  }
}
