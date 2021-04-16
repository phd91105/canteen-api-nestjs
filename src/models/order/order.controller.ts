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
import { Order } from './entities/order.entity';
import { ApiBearerAuth, ApiBody, ApiTags } from '@nestjs/swagger';
import { JwtAuthGuard } from 'src/authentication/jwt-auth.guard';

@Controller()
@ApiTags('Order')
export class OrderController {
  constructor(private readonly orderService: OrderService) {}

  @ApiBearerAuth()
  @UseGuards(JwtAuthGuard)
  @Get('orders')
  findAll(): Promise<Order[]> {
    return this.orderService.findAll();
  }

  @ApiBearerAuth()
  @UseGuards(JwtAuthGuard)
  @Get('order/:id')
  get(@Param('id') id: number) {
    return this.orderService.findOne(id);
  }

  @ApiBearerAuth()
  @UseGuards(JwtAuthGuard)
  @ApiBody({ type: Order })
  @Post('order')
  create(@Body() order: Order) {
    return this.orderService.create(order);
  }

  @ApiBearerAuth()
  @UseGuards(JwtAuthGuard)
  @Put('order/:id')
  update(@Param('id') id: number, @Body() order: Order) {
    return this.orderService.update(id, order);
  }

  @ApiBearerAuth()
  @UseGuards(JwtAuthGuard)
  @Delete('order/:id')
  deleteUser(@Param('id') id: number) {
    return this.orderService.delete(id);
  }
}
