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
import { CartService } from './cart.service';
import { CartEntity } from './cart.entity';
import { ApiBearerAuth, ApiBody, ApiTags } from '@nestjs/swagger';
import { JwtAuthGuard } from 'src/modules/auth/authentication/jwt-auth.guard';
import { DeleteResult, UpdateResult } from 'typeorm';
import { RolesGuard } from 'src/modules/auth/authorization/role.guard';
import { Role } from 'src/enums/role.enum';
import { Roles } from 'src/modules/auth/authorization/role.decorator';
import { REST } from 'src/interfaces/rest.interface';

@Controller()
@UseGuards(JwtAuthGuard, RolesGuard)
@ApiTags('Cart')
export class CartController implements REST {
  constructor(private readonly cartService: CartService) {}

  @ApiBearerAuth()
  @Roles(Role.Admin, Role.Staff, Role.User)
  @UseGuards(JwtAuthGuard)
  @Get('carts')
  async findAll(): Promise<CartEntity[]> {
    return this.cartService.findAll();
  }

  @ApiBearerAuth()
  @Roles(Role.Admin, Role.Staff, Role.User)
  @UseGuards(JwtAuthGuard)
  @Get('cart/:id')
  async findOne(@Param('id') id: number): Promise<CartEntity> {
    return this.cartService.findOne(id);
  }

  @ApiBearerAuth()
  @Roles(Role.Admin, Role.Staff, Role.User)
  @UseGuards(JwtAuthGuard)
  @ApiBody({ type: CartEntity })
  @Post('cart')
  async create(@Body() cart: CartEntity): Promise<CartEntity> {
    return this.cartService.create(cart);
  }

  @ApiBearerAuth()
  @Roles(Role.Admin, Role.Staff, Role.User)
  @UseGuards(JwtAuthGuard)
  @Put('cart/:id')
  async update(
    @Param('id') id: number,
    @Body() cart: CartEntity,
  ): Promise<UpdateResult> {
    return this.cartService.update(id, cart);
  }

  @ApiBearerAuth()
  @Roles(Role.Admin, Role.Staff, Role.User)
  @UseGuards(JwtAuthGuard)
  @Delete('cart/:id')
  async delete(@Param('id') id: number): Promise<DeleteResult> {
    return this.cartService.delete(id);
  }
}
