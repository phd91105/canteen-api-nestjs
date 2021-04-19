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
import { OrderService } from './order.service';
import { OrderEntity } from './entities/order.entity';
import { ApiBearerAuth, ApiBody, ApiTags } from '@nestjs/swagger';
import { JwtAuthGuard } from '../../auth/authentication/jwt-auth.guard';
import { DeleteResult, UpdateResult } from 'typeorm';

@Controller()
@ApiTags('Order')
export class OrderController {
  constructor(private readonly orderService: OrderService) {}

  @ApiBearerAuth()
  @UseGuards(JwtAuthGuard)
  @Get('orders')
  findAll(): Promise<OrderEntity[]> {
    return this.orderService.findAll();
  }

  @ApiBearerAuth()
  @UseGuards(JwtAuthGuard)
  @Get('order/:id')
  get(@Param('id') id: number): Promise<OrderEntity> {
    return this.orderService.findOne(id);
  }

  @ApiBearerAuth()
  @UseGuards(JwtAuthGuard)
  @ApiBody({ type: OrderEntity })
  @Post('order')
  create(@Body() order: OrderEntity): Promise<OrderEntity> {
    return this.orderService.create(order);
  }

  @ApiBearerAuth()
  @UseGuards(JwtAuthGuard)
  @Put('order/:id')
  update(
    @Param('id') id: number,
    @Body() order: OrderEntity,
  ): Promise<UpdateResult> {
    return this.orderService.update(id, order);
  }

  @ApiBearerAuth()
  @UseGuards(JwtAuthGuard)
  @Delete('order/:id')
  deleteUser(@Param('id') id: number): Promise<DeleteResult> {
    return this.orderService.delete(id);
  }
}
