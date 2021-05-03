import { OrderDetailService } from './orderdetail.service';
import { OrderDetailController } from './orderdetail.controller';
import { Module } from '@nestjs/common';
import { OrderDetailEntity } from './orderdetail.entity';
import { TypeOrmModule } from '@nestjs/typeorm';

@Module({
  imports: [TypeOrmModule.forFeature([OrderDetailEntity])],
  controllers: [OrderDetailController],
  providers: [OrderDetailService],
})
export class OrderDetailModule {}
