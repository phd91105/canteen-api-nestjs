import {
  Controller,
  Get,
  Post,
  Put,
  Delete,
  Body,
  Param,
  UseGuards,
  ValidationPipe,
} from '@nestjs/common';
import { FoodService } from './food.service';
import { FoodEntity } from './entities/food.entity';
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';
import { JwtAuthGuard } from '../../auth/authentication/jwt-auth.guard';
import { DeleteResult, UpdateResult } from 'typeorm';
import { RolesGuard } from 'src/auth/authorization/role.guard';
import { Roles } from 'src/auth/authorization/role.decorator';
import { Role } from 'src/enums/role.enum';

@Controller()
@UseGuards(JwtAuthGuard, RolesGuard)
@ApiTags('Food')
export class FoodController {
  constructor(private readonly foodService: FoodService) {}

  @Get('foods')
  @Roles(Role.Admin, Role.Staff, Role.User)
  findAll(): Promise<FoodEntity[]> {
    return this.foodService.findAll();
  }

  @Get('food/:id')
  @Roles(Role.Admin, Role.Staff, Role.User)
  get(@Param('id') id: number): Promise<FoodEntity> {
    return this.foodService.findOne(id);
  }

  @ApiBearerAuth()
  @Roles(Role.Admin, Role.Staff)
  @UseGuards(JwtAuthGuard)
  @Post('food')
  create(@Body() food: FoodEntity): Promise<FoodEntity> {
    return this.foodService.create(food);
  }

  @ApiBearerAuth()
  @Roles(Role.Admin, Role.Staff)
  @UseGuards(JwtAuthGuard)
  @Put('food/:id')
  update(
    @Param('id') id: number,
    @Body() food: FoodEntity,
  ): Promise<UpdateResult> {
    return this.foodService.update(id, food);
  }

  @ApiBearerAuth()
  @Roles(Role.Admin, Role.Staff)
  @UseGuards(JwtAuthGuard)
  @Delete('food/:id')
  deleteUser(@Param('id') id: number): Promise<DeleteResult> {
    return this.foodService.delete(id);
  }
}
