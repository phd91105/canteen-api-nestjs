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
import { JwtAuthGuard } from 'src/auth/authentication/jwt-auth.guard';
import { DeleteResult, UpdateResult } from 'typeorm';
import { RolesGuard } from 'src/auth/authorization/role.guard';
import { Roles } from 'src/auth/authorization/role.decorator';
import { Role } from 'src/enums/role.enum';
import { REST } from 'src/interfaces/rest.interface';

@Controller()
@UseGuards(JwtAuthGuard, RolesGuard)
@ApiTags('Food')
export class FoodController implements REST {
  constructor(private readonly foodService: FoodService) {}

  @Get('foods')
  @Roles(Role.Admin, Role.Staff, Role.User)
  async findAll(): Promise<FoodEntity[]> {
    return this.foodService.findAll();
  }

  @Get('food/:id')
  @Roles(Role.Admin, Role.Staff, Role.User)
  async findOne(@Param('id') id: number): Promise<FoodEntity> {
    return this.foodService.findOne(id);
  }

  @ApiBearerAuth()
  @Roles(Role.Admin, Role.Staff)
  @UseGuards(JwtAuthGuard)
  @Post('food')
  async create(@Body() food: FoodEntity): Promise<FoodEntity> {
    return this.foodService.create(food);
  }

  @ApiBearerAuth()
  @Roles(Role.Admin, Role.Staff)
  @UseGuards(JwtAuthGuard)
  @Put('food/:id')
  async update(
    @Param('id') id: number,
    @Body() food: FoodEntity,
  ): Promise<UpdateResult> {
    return this.foodService.update(id, food);
  }

  @ApiBearerAuth()
  @Roles(Role.Admin, Role.Staff)
  @UseGuards(JwtAuthGuard)
  @Delete('food/:id')
  async delete(@Param('id') id: number): Promise<DeleteResult> {
    return this.foodService.delete(id);
  }
}
