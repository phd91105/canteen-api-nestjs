import { Controller, Delete, Get, Post, Put } from '@nestjs/common';
// import { ProductsService } from './products.service';

@Controller('v1')
export class ProductsController {
  //   constructor(private readonly productService: ProductsService) {}
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
