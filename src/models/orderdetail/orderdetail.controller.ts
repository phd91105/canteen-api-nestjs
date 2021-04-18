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
import { OrderDetail } from './entities/orderdetail.entity';
import { ApiBearerAuth, ApiBody, ApiTags } from '@nestjs/swagger';
import { JwtAuthGuard } from '../../auth/jwt-auth.guard';

@Controller()
@ApiTags('OrderDetail')
export class OrderDetailController {
  constructor(private readonly orderdetailService: OrderDetailService) {}

  @ApiBearerAuth()
  @UseGuards(JwtAuthGuard)
  @Get('orderdetails')
  findAll(): Promise<OrderDetail[]> {
    return this.orderdetailService.findAll();
  }

  @ApiBearerAuth()
  @UseGuards(JwtAuthGuard)
  @Get('orderdetail/:id')
  get(@Param('id') id: number) {
    return this.orderdetailService.findOne(id);
  }

  @ApiBearerAuth()
  @UseGuards(JwtAuthGuard)
  @ApiBody({ type: OrderDetail })
  @Post('orderdetail')
  create(@Body() orderdetail: OrderDetail) {
    return this.orderdetailService.create(orderdetail);
  }

  @ApiBearerAuth()
  @UseGuards(JwtAuthGuard)
  @Put('orderdetail/:id')
  update(@Param('id') id: number, @Body() orderdetail: OrderDetail) {
    return this.orderdetailService.update(id, orderdetail);
  }

  @ApiBearerAuth()
  @UseGuards(JwtAuthGuard)
  @Delete('orderdetail/:id')
  deleteUser(@Param('id') id: number) {
    return this.orderdetailService.delete(id);
  }
}
