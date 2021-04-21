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
import { JwtAuthGuard } from 'src/auth/authentication/jwt-auth.guard';
import { DeleteResult, UpdateResult } from 'typeorm';
import { RolesGuard } from 'src/auth/authorization/role.guard';
import { Roles } from 'src/auth/authorization/role.decorator';
import { Role } from 'src/enums/role.enum';
import { REST } from 'src/interfaces/rest.interface';

@Controller()
@UseGuards(JwtAuthGuard, RolesGuard)
@ApiTags('Order')
export class OrderController implements REST {
  constructor(private readonly orderService: OrderService) {}

  @ApiBearerAuth()
  @Roles(Role.Admin, Role.Staff, Role.User)
  @UseGuards(JwtAuthGuard)
  @Get('orders')
  async findAll(): Promise<OrderEntity[]> {
    return this.orderService.findAll();
  }

  @ApiBearerAuth()
  @Roles(Role.Admin, Role.Staff, Role.User)
  @UseGuards(JwtAuthGuard)
  @Get('order/:id')
  async findOne(@Param('id') id: number): Promise<OrderEntity> {
    return this.orderService.findOne(id);
  }

  @ApiBearerAuth()
  @Roles(Role.Admin, Role.Staff, Role.User)
  @UseGuards(JwtAuthGuard)
  @ApiBody({ type: OrderEntity })
  @Post('order')
  async create(@Body() order: OrderEntity): Promise<OrderEntity> {
    return this.orderService.create(order);
  }

  @ApiBearerAuth()
  @Roles(Role.Admin, Role.Staff, Role.User)
  @UseGuards(JwtAuthGuard)
  @Put('order/:id')
  async update(
    @Param('id') id: number,
    @Body() order: OrderEntity,
  ): Promise<UpdateResult> {
    return this.orderService.update(id, order);
  }

  @ApiBearerAuth()
  @Roles(Role.Admin, Role.Staff, Role.User)
  @UseGuards(JwtAuthGuard)
  @Delete('order/:id')
  async delete(@Param('id') id: number): Promise<DeleteResult> {
    return this.orderService.delete(id);
  }
}
