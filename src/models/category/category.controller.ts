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
import { CategoryService } from './category.service';
import { Category } from './entities/category.entity';
import { ApiBearerAuth, ApiBody, ApiTags } from '@nestjs/swagger';
import { JwtAuthGuard } from '../../auth/jwt-auth.guard';

@Controller()
@ApiTags('Food')
export class CategoryController {
  constructor(private readonly catService: CategoryService) {}

  @ApiBearerAuth()
  @UseGuards(JwtAuthGuard)
  @Get('categories')
  findAll(): Promise<Category[]> {
    return this.catService.findAll();
  }

  @ApiBearerAuth()
  @UseGuards(JwtAuthGuard)
  @Get('category/:id')
  get(@Param('id') id: number) {
    return this.catService.findOne(id);
  }

  @ApiBearerAuth()
  @UseGuards(JwtAuthGuard)
  @ApiBody({ type: Category })
  @Post('category')
  create(@Body() category: Category) {
    return this.catService.create(category);
  }

  @ApiBearerAuth()
  @UseGuards(JwtAuthGuard)
  @Put('category/:id')
  update(@Param('id') id: number, @Body() category: Category) {
    return this.catService.update(id, category);
  }

  @ApiBearerAuth()
  @UseGuards(JwtAuthGuard)
  @Delete('category/:id')
  deleteUser(@Param('id') id: number) {
    return this.catService.delete(id);
  }
}
