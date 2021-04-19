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
import { CartEntity } from './entities/cart.entity';
import { ApiBearerAuth, ApiBody, ApiTags } from '@nestjs/swagger';
import { JwtAuthGuard } from '../../auth/authentication/jwt-auth.guard';
import { DeleteResult, UpdateResult } from 'typeorm';

@Controller()
@ApiTags('Cart')
export class CartController {
  constructor(private readonly cartService: CartService) {}

  @ApiBearerAuth()
  @UseGuards(JwtAuthGuard)
  @Get('carts')
  findAll(): Promise<CartEntity[]> {
    return this.cartService.findAll();
  }

  @ApiBearerAuth()
  @UseGuards(JwtAuthGuard)
  @Get('cart/:id')
  get(@Param('id') id: number): Promise<CartEntity> {
    return this.cartService.findOne(id);
  }

  @ApiBearerAuth()
  @UseGuards(JwtAuthGuard)
  @ApiBody({ type: CartEntity })
  @Post('cart')
  create(@Body() cart: CartEntity): Promise<CartEntity> {
    return this.cartService.create(cart);
  }

  @ApiBearerAuth()
  @UseGuards(JwtAuthGuard)
  @Put('cart/:id')
  update(
    @Param('id') id: number,
    @Body() cart: CartEntity,
  ): Promise<UpdateResult> {
    return this.cartService.update(id, cart);
  }

  @ApiBearerAuth()
  @UseGuards(JwtAuthGuard)
  @Delete('cart/:id')
  deleteUser(@Param('id') id: number): Promise<DeleteResult> {
    return this.cartService.delete(id);
  }
}
