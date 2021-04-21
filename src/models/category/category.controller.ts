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
import { JwtAuthGuard } from 'src/auth/authentication/jwt-auth.guard';
import { DeleteResult, UpdateResult } from 'typeorm';
import { RolesGuard } from 'src/auth/authorization/role.guard';
import { Role } from 'src/enums/role.enum';
import { Roles } from 'src/auth/authorization/role.decorator';
import { IREST } from 'src/interfaces/rest.interface';

@Controller()
@UseGuards(JwtAuthGuard, RolesGuard)
@ApiTags('Food')
export class CategoryController implements IREST {
  constructor(private readonly catService: CategoryService) {}

  @ApiBearerAuth()
  @Roles(Role.Admin, Role.Staff, Role.User)
  @UseGuards(JwtAuthGuard)
  @Get('categories')
  findAll(): Promise<CategoryEntity[]> {
    return this.catService.findAll();
  }

  @ApiBearerAuth()
  @Roles(Role.Admin, Role.Staff, Role.User)
  @UseGuards(JwtAuthGuard)
  @Get('category/:id')
  findOne(@Param('id') id: number): Promise<CategoryEntity> {
    return this.catService.findOne(id);
  }

  @ApiBearerAuth()
  @Roles(Role.Admin, Role.Staff)
  @UseGuards(JwtAuthGuard)
  @ApiBody({ type: CategoryEntity })
  @Post('category')
  create(@Body() category: CategoryEntity): Promise<CategoryEntity> {
    return this.catService.create(category);
  }

  @ApiBearerAuth()
  @Roles(Role.Admin, Role.Staff)
  @UseGuards(JwtAuthGuard)
  @Put('category/:id')
  update(
    @Param('id') id: number,
    @Body() category: CategoryEntity,
  ): Promise<UpdateResult> {
    return this.catService.update(id, category);
  }

  @ApiBearerAuth()
  @Roles(Role.Admin, Role.Staff)
  @UseGuards(JwtAuthGuard)
  @Delete('category/:id')
  delete(@Param('id') id: number): Promise<DeleteResult> {
    return this.catService.delete(id);
  }
}
