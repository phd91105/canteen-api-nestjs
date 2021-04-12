import { HttpStatus, Injectable } from '@nestjs/common';

@Injectable()
export class AppService {
  getServerStatus(): { [key: string]: number | string } {
    return {
      status: HttpStatus.OK,
      message: 'Server is working',
    };
  }
}
