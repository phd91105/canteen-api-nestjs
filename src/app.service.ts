import { HttpStatus, Injectable } from '@nestjs/common';

@Injectable()
export class AppService {
  getServerStatus(): Record<string, string | number> {
    return {
      status: HttpStatus.OK,
      message: 'Server is working',
    };
  }
}
