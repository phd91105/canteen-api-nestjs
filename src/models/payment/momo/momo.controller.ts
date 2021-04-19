import { Controller, Get, Query, Redirect } from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { MomoService } from './momo.service';
import { IPaymentParams } from 'src/interfaces/payment';

@Controller('momo')
@ApiTags('Payment')
export class MomoController {
  constructor(private readonly momoService: MomoService) {}

  @Get('checkout')
  @Redirect()
  async payment(
    @Query() payParam: IPaymentParams,
  ): Promise<Record<string, string>> {
    const checkoutUrl = await this.momoService.payment(payParam);
    return { url: checkoutUrl };
  }

  @Get('return')
  returnUrl(
    @Query() query: Record<string, string | number>,
  ): Record<string, string | number> {
    query['amount'] = +query['amount'];
    return query;
  }
}
