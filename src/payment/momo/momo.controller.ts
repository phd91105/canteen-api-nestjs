import { Body, Controller, Get, Post, Query } from '@nestjs/common';
import { ApiBody, ApiProperty } from '@nestjs/swagger';
import { MomoService } from './momo.service';

class MomoBody {
  @ApiProperty({ type: Number })
  amount: number;

  @ApiProperty({ type: String })
  msg: string;
}

@Controller('momo')
export class MomoController {
  constructor(private readonly momoService: MomoService) {}

  @ApiBody({ type: MomoBody })
  @Post('payment')
  payment(@Body('amount') _amount?: number, @Body('msg') msg?: string) {
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
