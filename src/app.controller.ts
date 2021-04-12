import { Controller, Get } from '@nestjs/common';
import { AppService } from './app.service';

@Controller()
export class AppController {
  constructor(private readonly appService: AppService) {}

  @Get()
  getServerStatus(): { [key: string]: number | string } {
    return this.appService.getServerStatus();
  }
}
