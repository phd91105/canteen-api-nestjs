import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  Put,
  UseGuards,
} from '@nestjs/common';
import { ProductService } from './product.service';
import { Product } from './product.entity';
import { ApiBearerAuth } from '@nestjs/swagger';
import { JwtAuthGuard } from 'src/auth/jwt-auth.guard';

@Controller()
export class ProductController {
  constructor(private readonly productService: ProductService) {}

  @Get('products')
  findAll(): Promise<Product[]> {
    return this.productService.findAll();
  }

  @Get('product/:id')
  get(@Param() params) {
    return this.productService.findOne(params.id);
  }

  @ApiBearerAuth()
  @UseGuards(JwtAuthGuard)
  @Post('product')
  create(@Body() product: Product) {
    return this.productService.create(product);
  }

  @ApiBearerAuth()
  @UseGuards(JwtAuthGuard)
  @Put('product/:id')
  update(@Param('id') id: number, @Body() product: Product) {
    return this.productService.update(id, product);
  }

  @ApiBearerAuth()
  @UseGuards(JwtAuthGuard)
  @Delete('product/:id')
  deleteUser(@Param('id') id: number) {
    return this.productService.delete(id);
  }
}
