import { Controller, Delete, Get, Post, Put, UseGuards } from '@nestjs/common';
import { ApiBearerAuth } from '@nestjs/swagger';
import { JwtAuthGuard } from '../auth/jwt-auth.guard';
import { ProductService } from './product.service';

@Controller()
export class ProductController {
  constructor(private readonly productService: ProductService) {}

  @ApiBearerAuth()
  @Post('product')
  @UseGuards(JwtAuthGuard)
  createProduct() {
    return 'list product';
  }

  @ApiBearerAuth()
  @Get('products')
  @UseGuards(JwtAuthGuard)
  getListProduct() {
    return 'list product';
  }

  @ApiBearerAuth()
  @Get('product/:id')
  @UseGuards(JwtAuthGuard)
  getProduct() {
    return 'list product';
  }

  @ApiBearerAuth()
  @Put('product/:id')
  @UseGuards(JwtAuthGuard)
  changeProductInfo() {
    return 'list product';
  }

  @ApiBearerAuth()
  @Delete('product/:id')
  @UseGuards(JwtAuthGuard)
  delProduct() {
    return 'list product';
  }
}
