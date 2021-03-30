import { HttpStatus, Injectable } from '@nestjs/common';

@Injectable()
export class AppService {
  getServerStatus(): any {
    return {
      status: HttpStatus.OK,
      msg: 'Server is working',
    };
  }
}
