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
import { RoleService } from './role.service';
import { Role } from './entities/role.entity';
import { ApiBearerAuth, ApiBody, ApiTags } from '@nestjs/swagger';
import { JwtAuthGuard } from '../../auth/guards/jwt-auth.guard';

@Controller()
@ApiTags('User')
export class RoleController {
  constructor(private readonly roleService: RoleService) {}

  @ApiBearerAuth()
  @UseGuards(JwtAuthGuard)
  @Get('roles')
  findAll(): Promise<Role[]> {
    return this.roleService.findAll();
  }

  @ApiBearerAuth()
  @UseGuards(JwtAuthGuard)
  @Get('role/:id')
  get(@Param('id') id: number) {
    return this.roleService.findOne(id);
  }

  @ApiBearerAuth()
  @UseGuards(JwtAuthGuard)
  @ApiBody({ type: Role })
  @Post('role')
  create(@Body() role: Role) {
    return this.roleService.create(role);
  }

  @ApiBearerAuth()
  @UseGuards(JwtAuthGuard)
  @Put('role/:id')
  update(@Param('id') id: number, @Body() role: Role) {
    return this.roleService.update(id, role);
  }

  @ApiBearerAuth()
  @UseGuards(JwtAuthGuard)
  @Delete('role/:id')
  deleteUser(@Param('id') id: number) {
    return this.roleService.delete(id);
  }
}
