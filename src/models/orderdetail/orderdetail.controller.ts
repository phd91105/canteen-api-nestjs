import {
  Controller,
  Get,
  Post,
  Put,
  Delete,
  Body,
  Param,
  UseGuards,
  ValidationPipe,
} from '@nestjs/common';
import { OrderDetailService } from './orderdetail.service';
import { OrderDetailEntity } from './entities/orderdetail.entity';
import { ApiBearerAuth, ApiBody, ApiTags } from '@nestjs/swagger';
import { JwtAuthGuard } from '../../auth/authentication/jwt-auth.guard';
import { DeleteResult, UpdateResult } from 'typeorm';
import { RolesGuard } from 'src/auth/authorization/role.guard';
import { Roles } from 'src/auth/authorization/role.decorator';
import { Role } from 'src/enums/role.enum';

@Controller()
@UseGuards(JwtAuthGuard, RolesGuard)
@ApiTags('OrderDetail')
export class OrderDetailController {
  constructor(private readonly orderdetailService: OrderDetailService) {}

  @ApiBearerAuth()
  @Roles(Role.Admin, Role.Staff, Role.User)
  @UseGuards(JwtAuthGuard)
  @Get('orderdetails')
  findAll(): Promise<OrderDetailEntity[]> {
    return this.orderdetailService.findAll();
  }

  @ApiBearerAuth()
  @Roles(Role.Admin, Role.Staff, Role.User)
  @UseGuards(JwtAuthGuard)
  @Get('orderdetail/:id')
  get(@Param('id') id: number): Promise<OrderDetailEntity> {
    return this.orderdetailService.findOne(id);
  }

  @ApiBearerAuth()
  @Roles(Role.Admin, Role.Staff)
  @UseGuards(JwtAuthGuard)
  @ApiBody({ type: OrderDetailEntity })
  @Post('orderdetail')
  create(
    @Body(new ValidationPipe()) orderdetail: OrderDetailEntity,
  ): Promise<OrderDetailEntity> {
    return this.orderdetailService.create(orderdetail);
  }

  @ApiBearerAuth()
  @Roles(Role.Admin, Role.Staff)
  @UseGuards(JwtAuthGuard)
  @Put('orderdetail/:id')
  update(
    @Param('id') id: number,
    @Body(new ValidationPipe()) orderdetail: OrderDetailEntity,
  ): Promise<UpdateResult> {
    return this.orderdetailService.update(id, orderdetail);
  }

  @ApiBearerAuth()
  @Roles(Role.Admin, Role.Staff)
  @UseGuards(JwtAuthGuard)
  @Delete('orderdetail/:id')
  deleteUser(@Param('id') id: number): Promise<DeleteResult> {
    return this.orderdetailService.delete(id);
  }
}
