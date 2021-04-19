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
import { FoodEntity } from './entities/food.entity';
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';
import { JwtAuthGuard } from '../../auth/authentication/jwt-auth.guard';
import { DeleteResult, UpdateResult } from 'typeorm';

@Controller()
@ApiTags('Food')
export class FoodController {
  constructor(private readonly foodService: FoodService) {}

  @Get('foods')
  findAll(): Promise<FoodEntity[]> {
    return this.foodService.findAll();
  }

  @Get('food/:id')
  get(@Param('id') id: number): Promise<FoodEntity> {
    return this.foodService.findOne(id);
  }

  @ApiBearerAuth()
  @UseGuards(JwtAuthGuard)
  @Post('food')
  create(@Body() food: FoodEntity): Promise<FoodEntity> {
    return this.foodService.create(food);
  }

  @ApiBearerAuth()
  @UseGuards(JwtAuthGuard)
  @Put('food/:id')
  update(
    @Param('id') id: number,
    @Body() food: FoodEntity,
  ): Promise<UpdateResult> {
    return this.foodService.update(id, food);
  }

  @ApiBearerAuth()
  @UseGuards(JwtAuthGuard)
  @Delete('food/:id')
  deleteUser(@Param('id') id: number): Promise<DeleteResult> {
    return this.foodService.delete(id);
  }
}
