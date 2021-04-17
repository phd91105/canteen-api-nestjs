import { Controller, Get, Query, Res } from '@nestjs/common';
import { Response } from 'express';
import { ApiTags } from '@nestjs/swagger';
import { MomoService } from './momo.service';

@Controller('momo')
@ApiTags('Payment')
export class MomoController {
  constructor(private readonly momoService: MomoService) {}

  @Get('checkout')
  async payment(@Res() response: Response, @Query() query: any) {
    const { amount, msg } = query;
    const checkoutUrl = await this.momoService.payment(amount, msg); //
    response.redirect(checkoutUrl['payUrl']);
  }

  @Get('return')
  returnUrl(@Query() query: any) {
    const {
      amount,
      localMessage,
      orderId,
      orderType,
      payType,
      extraData,
      requestId,
      transId,
      responseTime,
    } = query;
    return this.momoService.returnUrl(
      amount,
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
