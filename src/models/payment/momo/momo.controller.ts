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
    const checkoutUrl = await this.momoService.payment(query.amount, query.msg);
    response.redirect(checkoutUrl['payUrl']);
  }

  @Get('return')
  returnUrl(@Query() query: any) {
    return this.momoService.returnUrl(
      query.amount,
      query.localMessage,
      query.orderId,
      query.orderType,
      query.payType,
      query.extraData,
      query.requestId,
      query.transId,
      query.responseTime,
    );
  }
}
