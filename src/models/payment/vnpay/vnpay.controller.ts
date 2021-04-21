import { Controller, Get, Query, Redirect } from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { VnpayService } from './vnpay.service';
import { IPaymentParams } from 'src/interfaces/payment.interface';

@Controller('vnpay')
@ApiTags('Payment')
export class VnpayController {
  constructor(private readonly vnpayService: VnpayService) {}

  @Get('checkout')
  @Redirect()
  async payment(
    @Query() payParam: IPaymentParams,
  ): Promise<Record<string, string>> {
    const checkoutUrl: string = await this.vnpayService.payment(payParam);
    return { url: checkoutUrl };
  }

  @Get('return')
  returnUrl(
    @Query() query: Record<string, string | number>,
  ): Record<string, string | number> {
    query['vnp_Amount'] = +query['vnp_Amount'] / 100;
    return query;
  }
}
