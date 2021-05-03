import { VnpayService } from './vnpay.service';
import { VnpayController } from './vnpay.controller';
import { Module } from '@nestjs/common';

@Module({
  imports: [],
  controllers: [VnpayController],
  providers: [VnpayService],
})
export class VnpayModule {}
