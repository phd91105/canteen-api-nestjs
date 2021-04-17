import { Controller, Get, Query, Res } from '@nestjs/common';
import { Response } from 'express';
import { ApiTags } from '@nestjs/swagger';
import { VnpayService } from './vnpay.service';

@Controller('vnpay')
@ApiTags('Payment')
export class VnpayController {
  constructor(private readonly vnpayService: VnpayService) {}

  @Get('checkout')
  async payment(@Res() response: Response, @Query() query: any) {
    const { amount, orderInfo, orderType, customerId } = query;
    const checkoutUrl = await this.vnpayService.payment(
      amount,
      orderInfo,
      orderType,
      customerId,
    );
    response.redirect(checkoutUrl);
  }

  @Get('return')
  returnUrl(@Query() query: any) {
    const {
      vnp_TransactionNo,
      vnp_BankTranNo,
      vnp_Amount,
      vnp_BankCode,
      vnp_OrderInfo,
      vnp_PayDate,
    } = query;
    return this.vnpayService.returnUrl(
      vnp_TransactionNo,
      vnp_BankTranNo,
      vnp_Amount,
      vnp_BankCode,
      vnp_OrderInfo,
      vnp_PayDate,
    );
  }
}
