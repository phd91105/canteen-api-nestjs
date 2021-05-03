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
import { CategoryEntity } from './category.entity';
import { ApiBearerAuth, ApiBody, ApiTags } from '@nestjs/swagger';
import { JwtAuthGuard } from 'src/modules/auth/authentication/jwt-auth.guard';
import { DeleteResult, UpdateResult } from 'typeorm';
import { RolesGuard } from 'src/modules/auth/authorization/role.guard';
import { Role } from 'src/enums/role.enum';
import { Roles } from 'src/modules/auth/authorization/role.decorator';
import { REST } from 'src/interfaces/rest.interface';

@Controller()
@UseGuards(JwtAuthGuard, RolesGuard)
@ApiTags('Food')
export class CategoryController implements REST {
  constructor(private readonly catService: CategoryService) {}

  @ApiBearerAuth()
  @Roles(Role.Admin, Role.Staff, Role.User)
  @UseGuards(JwtAuthGuard)
  @Get('categories')
  async findAll(): Promise<CategoryEntity[]> {
    return this.catService.findAll();
  }

  @ApiBearerAuth()
  @Roles(Role.Admin, Role.Staff, Role.User)
  @UseGuards(JwtAuthGuard)
  @Get('category/:id')
  async findOne(@Param('id') id: number): Promise<CategoryEntity> {
    return this.catService.findOne(id);
  }

  @ApiBearerAuth()
  @Roles(Role.Admin, Role.Staff)
  @UseGuards(JwtAuthGuard)
  @ApiBody({ type: CategoryEntity })
  @Post('category')
  async create(@Body() category: CategoryEntity): Promise<CategoryEntity> {
    return this.catService.create(category);
  }

  @ApiBearerAuth()
  @Roles(Role.Admin, Role.Staff)
  @UseGuards(JwtAuthGuard)
  @Put('category/:id')
  async update(
    @Param('id') id: number,
    @Body() category: CategoryEntity,
  ): Promise<UpdateResult> {
    return this.catService.update(id, category);
  }

  @ApiBearerAuth()
  @Roles(Role.Admin, Role.Staff)
  @UseGuards(JwtAuthGuard)
  @Delete('category/:id')
  async delete(@Param('id') id: number): Promise<DeleteResult> {
    return this.catService.delete(id);
  }
}
