import { Controller, Get, Query } from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { MomoService } from './momo.service';

@Controller('momo')
@ApiTags('Payment')
export class MomoController {
  constructor(private readonly momoService: MomoService) {}

  @Get('payment')
  payment(@Query() query: any) {
    return this.momoService.payment(query.amount, query.msg);
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
