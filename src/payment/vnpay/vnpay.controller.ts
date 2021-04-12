import { Controller, Get, Query, Res } from '@nestjs/common';
import { Response } from 'express';
import { ApiTags } from '@nestjs/swagger';
import { VnpayService } from './vnpay.service';

@Controller('vnpay')
@ApiTags('Payment')
export class VnpayController {
  constructor(private readonly vnpayService: VnpayService) {}

  @Get('payment')
  async payment(@Res() response: Response, @Query() query: any) {
    const checkoutUrl = await this.vnpayService.payment(
      query.amount,
      query.orderInfo,
      query.orderType,
      query.customerId,
    );
    response.redirect(checkoutUrl);
  }

  @Get('return')
  returnUrl(@Query() query: any) {
    return this.vnpayService.returnUrl(
      query.vnp_TransactionNo,
      query.vnp_BankTranNo,
      query.vnp_Amount,
      query.vnp_BankCode,
      query.vnp_OrderInfo,
      query.vnp_PayDate,
    );
  }
}
