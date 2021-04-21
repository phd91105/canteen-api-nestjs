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
import { JwtAuthGuard } from 'src/auth/authentication/jwt-auth.guard';
import { DeleteResult, UpdateResult } from 'typeorm';
import { RolesGuard } from 'src/auth/authorization/role.guard';
import { Role } from 'src/enums/role.enum';
import { Roles } from 'src/auth/authorization/role.decorator';
import { IREST } from 'src/interfaces/rest.interface';

@Controller()
@UseGuards(JwtAuthGuard, RolesGuard)
@ApiTags('Cart')
export class CartController implements IREST {
  constructor(private readonly cartService: CartService) {}

  @ApiBearerAuth()
  @Roles(Role.Admin, Role.Staff, Role.User)
  @UseGuards(JwtAuthGuard)
  @Get('carts')
  findAll(): Promise<CartEntity[]> {
    return this.cartService.findAll();
  }

  @ApiBearerAuth()
  @Roles(Role.Admin, Role.Staff, Role.User)
  @UseGuards(JwtAuthGuard)
  @Get('cart/:id')
  findOne(@Param('id') id: number): Promise<CartEntity> {
    return this.cartService.findOne(id);
  }

  @ApiBearerAuth()
  @Roles(Role.Admin, Role.Staff, Role.User)
  @UseGuards(JwtAuthGuard)
  @ApiBody({ type: CartEntity })
  @Post('cart')
  create(@Body() cart: CartEntity): Promise<CartEntity> {
    return this.cartService.create(cart);
  }

  @ApiBearerAuth()
  @Roles(Role.Admin, Role.Staff, Role.User)
  @UseGuards(JwtAuthGuard)
  @Put('cart/:id')
  update(
    @Param('id') id: number,
    @Body() cart: CartEntity,
  ): Promise<UpdateResult> {
    return this.cartService.update(id, cart);
  }

  @ApiBearerAuth()
  @Roles(Role.Admin, Role.Staff, Role.User)
  @UseGuards(JwtAuthGuard)
  @Delete('cart/:id')
  delete(@Param('id') id: number): Promise<DeleteResult> {
    return this.cartService.delete(id);
  }
}
