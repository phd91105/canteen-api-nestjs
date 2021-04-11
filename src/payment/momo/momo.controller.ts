import { Controller, Get, Post, Query } from '@nestjs/common';
import { MomoService } from './momo.service';

@Controller('momo')
export class MomoController {
  constructor(private readonly momoService: MomoService) {}

  @Post('payment')
  payment(@Query('amount') _amount?: number, @Query('msg') msg?: string) {
    return this.momoService.payment(_amount, msg);
  }

  @Get('payment')
  returnUrl(
    @Query('amount') _amount: string,
    @Query('localMessage') localMessage: string,
    @Query('orderId') orderId: string,
    @Query('orderType') orderType: string,
    @Query('payType') payType: string,
    @Query('extraData') extraData: string,
    @Query('requestId') requestId: string,
    @Query('transId') transId: string,
    @Query('responseTime') responseTime: string,
  ) {
    return this.momoService.returnUrl(
      _amount,
      localMessage,
      orderId,
      orderType,
      payType,
      extraData,
      requestId,
      transId,
      responseTime,
    );
  }
}
