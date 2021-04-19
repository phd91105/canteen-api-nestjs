import { Controller, Get, Query, Res } from '@nestjs/common';
import { Response } from 'express';
import { ApiTags } from '@nestjs/swagger';
import { MomoService } from './momo.service';

@Controller('momo')
@ApiTags('Payment')
export class MomoController {
  constructor(private readonly momoService: MomoService) {}

  @Get('checkout')
  async payment(
    @Res() response: Response,
    @Query() query: Record<string, string>,
  ): Promise<void> {
    const { amount, orderInfo } = query;
    const checkoutUrl = await this.momoService.payment(amount, orderInfo);
    response.redirect(checkoutUrl['payUrl']);
  }

  @Get('return')
  returnUrl(
    @Query() query: Record<string, string | number>,
  ): Record<string, string | number> {
    query['amount'] = +query['amount'];
    return query;
  }
}
