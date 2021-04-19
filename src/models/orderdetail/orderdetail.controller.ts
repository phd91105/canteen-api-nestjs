import {
  Controller,
  Get,
  Post,
  Put,
  Delete,
  Body,
  Param,
  UseGuards,
} from '@nestjs/common';
import { OrderDetailService } from './orderdetail.service';
import { OrderDetailEntity } from './entities/orderdetail.entity';
import { ApiBearerAuth, ApiBody, ApiTags } from '@nestjs/swagger';
import { JwtAuthGuard } from '../../auth/authentication/jwt-auth.guard';
import { DeleteResult, UpdateResult } from 'typeorm';

@Controller()
@ApiTags('OrderDetail')
export class OrderDetailController {
  constructor(private readonly orderdetailService: OrderDetailService) {}

  @ApiBearerAuth()
  @UseGuards(JwtAuthGuard)
  @Get('orderdetails')
  findAll(): Promise<OrderDetailEntity[]> {
    return this.orderdetailService.findAll();
  }

  @ApiBearerAuth()
  @UseGuards(JwtAuthGuard)
  @Get('orderdetail/:id')
  get(@Param('id') id: number): Promise<OrderDetailEntity> {
    return this.orderdetailService.findOne(id);
  }

  @ApiBearerAuth()
  @UseGuards(JwtAuthGuard)
  @ApiBody({ type: OrderDetailEntity })
  @Post('orderdetail')
  create(@Body() orderdetail: OrderDetailEntity): Promise<OrderDetailEntity> {
    return this.orderdetailService.create(orderdetail);
  }

  @ApiBearerAuth()
  @UseGuards(JwtAuthGuard)
  @Put('orderdetail/:id')
  update(
    @Param('id') id: number,
    @Body() orderdetail: OrderDetailEntity,
  ): Promise<UpdateResult> {
    return this.orderdetailService.update(id, orderdetail);
  }

  @ApiBearerAuth()
  @UseGuards(JwtAuthGuard)
  @Delete('orderdetail/:id')
  deleteUser(@Param('id') id: number): Promise<DeleteResult> {
    return this.orderdetailService.delete(id);
  }
}
