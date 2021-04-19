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
import { CategoryEntity } from './entities/category.entity';
import { ApiBearerAuth, ApiBody, ApiTags } from '@nestjs/swagger';
import { JwtAuthGuard } from '../../auth/authentication/jwt-auth.guard';
import { DeleteResult, UpdateResult } from 'typeorm';

@Controller()
@ApiTags('Food')
export class CategoryController {
  constructor(private readonly catService: CategoryService) {}

  @ApiBearerAuth()
  @UseGuards(JwtAuthGuard)
  @Get('categories')
  findAll(): Promise<CategoryEntity[]> {
    return this.catService.findAll();
  }

  @ApiBearerAuth()
  @UseGuards(JwtAuthGuard)
  @Get('category/:id')
  get(@Param('id') id: number): Promise<CategoryEntity> {
    return this.catService.findOne(id);
  }

  @ApiBearerAuth()
  @UseGuards(JwtAuthGuard)
  @ApiBody({ type: CategoryEntity })
  @Post('category')
  create(@Body() category: CategoryEntity): Promise<CategoryEntity> {
    return this.catService.create(category);
  }

  @ApiBearerAuth()
  @UseGuards(JwtAuthGuard)
  @Put('category/:id')
  update(
    @Param('id') id: number,
    @Body() category: CategoryEntity,
  ): Promise<UpdateResult> {
    return this.catService.update(id, category);
  }

  @ApiBearerAuth()
  @UseGuards(JwtAuthGuard)
  @Delete('category/:id')
  deleteUser(@Param('id') id: number): Promise<DeleteResult> {
    return this.catService.delete(id);
  }
}
