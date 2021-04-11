import { OrderDetailService } from './orderdetail.service';
import { OrderDetailController } from './orderdetail.controller';
import { Module } from '@nestjs/common';

@Module({
  imports: [],
  controllers: [OrderDetailController],
  providers: [OrderDetailService],
})
export class OrderDetailModule {}
