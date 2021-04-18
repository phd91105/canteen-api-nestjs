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
import { Cart } from './entities/cart.entity';
import { ApiBearerAuth, ApiBody, ApiTags } from '@nestjs/swagger';
import { JwtAuthGuard } from '../../auth/jwt-auth.guard';

@Controller()
@ApiTags('Cart')
export class CartController {
  constructor(private readonly cartService: CartService) {}

  @ApiBearerAuth()
  @UseGuards(JwtAuthGuard)
  @Get('carts')
  findAll(): Promise<Cart[]> {
    return this.cartService.findAll();
  }

  @ApiBearerAuth()
  @UseGuards(JwtAuthGuard)
  @Get('cart/:id')
  get(@Param('id') id: number) {
    return this.cartService.findOne(id);
  }

  @ApiBearerAuth()
  @UseGuards(JwtAuthGuard)
  @ApiBody({ type: Cart })
  @Post('cart')
  create(@Body() cart: Cart) {
    return this.cartService.create(cart);
  }

  @ApiBearerAuth()
  @UseGuards(JwtAuthGuard)
  @Put('cart/:id')
  update(@Param('id') id: number, @Body() cart: Cart) {
    return this.cartService.update(id, cart);
  }

  @ApiBearerAuth()
  @UseGuards(JwtAuthGuard)
  @Delete('cart/:id')
  deleteUser(@Param('id') id: number) {
    return this.cartService.delete(id);
  }
}
