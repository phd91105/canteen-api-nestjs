import { Controller, Delete, Get, Post, Put } from '@nestjs/common';
import { ProductService } from './product.service';

@Controller()
export class ProductController {
  constructor(private readonly productService: ProductService) {}
  @Post('product')
  createProduct() {
    return 'list product';
  }
  @Get('products')
  getListProduct() {
    return 'list product';
  }
  @Get('product/:id')
  getProduct() {
    return 'list product';
  }
  @Put('product/:id')
  changeProductInfo() {
    return 'list product';
  }
  @Delete('product/:id')
  delProduct() {
    return 'list product';
  }
}
