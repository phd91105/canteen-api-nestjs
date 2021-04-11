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
import { FoodService } from './food.service';
import { Food } from './food.entity';
import { ApiBearerAuth } from '@nestjs/swagger';
import { JwtAuthGuard } from 'src/auth/jwt-auth.guard';

@Controller()
export class FoodController {
  constructor(private readonly foodService: FoodService) {}

  @Get('foods')
  findAll(): Promise<Food[]> {
    return this.foodService.findAll();
  }

  @Get('food/:id')
  get(@Param() params) {
    return this.foodService.findOne(params.id);
  }

  @ApiBearerAuth()
  @UseGuards(JwtAuthGuard)
  @Post('food')
  create(@Body() food: Food) {
    return this.foodService.create(food);
  }

  @ApiBearerAuth()
  @UseGuards(JwtAuthGuard)
  @Put('food/:id')
  update(@Param('id') id: number, @Body() food: Food) {
    return this.foodService.update(id, food);
  }

  @ApiBearerAuth()
  @UseGuards(JwtAuthGuard)
  @Delete('food/:id')
  deleteUser(@Param('id') id: number) {
    return this.foodService.delete(id);
  }
}