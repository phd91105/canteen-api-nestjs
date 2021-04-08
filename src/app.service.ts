import { HttpStatus, Injectable } from '@nestjs/common';

@Injectable()
export class AppService {
  getServerStatus(): any {
    return {
      status: HttpStatus.OK,
      message: 'Server is working',
    };
  }
}
