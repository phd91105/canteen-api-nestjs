import { OrderDetailService } from './orderdetail.service';
import { OrderDetailController } from './orderdetail.controller';
import { Module } from '@nestjs/common';
import { OrderDetail } from './entities/orderdetail.entity';
import { TypeOrmModule } from '@nestjs/typeorm';

@Module({
  imports: [TypeOrmModule.forFeature([OrderDetail])],
  controllers: [OrderDetailController],
  providers: [OrderDetailService],
})
export class OrderDetailModule {}
