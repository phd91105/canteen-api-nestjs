import { Controller, Get, Query, Res } from '@nestjs/common';
import { Response } from 'express';
import { ApiTags } from '@nestjs/swagger';
import { VnpayService } from './vnpay.service';

@Controller('vnpay')
@ApiTags('Payment')
export class VnpayController {
  constructor(private readonly vnpayService: VnpayService) {}

  @Get('checkout')
  async payment(
    @Res() response: Response,
    @Query() query: Record<string, string>,
  ) {
    const { amount, orderInfo } = query;
    const checkoutUrl = await this.vnpayService.payment(amount, orderInfo);
    response.redirect(checkoutUrl);
  }

  @Get('return')
  returnUrl(@Query() query: Record<string, string | number>) {
    query['vnp_Amount'] = +query['vnp_Amount'] / 100;
    return query;
  }
}
