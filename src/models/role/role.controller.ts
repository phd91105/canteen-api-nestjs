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
import { RoleEntity } from './entities/role.entity';
import { ApiBearerAuth, ApiBody, ApiTags } from '@nestjs/swagger';
import { JwtAuthGuard } from '../../auth/authentication/jwt-auth.guard';
import { Roles } from '../../auth/authorization/role.decorator';
import { Role } from '../../enums/role.enum';
import { RolesGuard } from '../../auth/authorization/role.guard';
import { DeleteResult, UpdateResult } from 'typeorm';

@Controller()
@UseGuards(JwtAuthGuard, RolesGuard)
@ApiTags('User')
export class RoleController {
  constructor(private readonly roleService: RoleService) {}

  @ApiBearerAuth()
  @Roles(Role.Admin)
  @Get('roles')
  findAll(): Promise<RoleEntity[]> {
    return this.roleService.findAll();
  }

  @ApiBearerAuth()
  @Roles(Role.Admin)
  @Get('role/:id')
  get(@Param('id') id: number): Promise<RoleEntity> {
    return this.roleService.findOne(id);
  }

  @ApiBearerAuth()
  @Roles(Role.Admin)
  @ApiBody({ type: RoleEntity })
  @Post('role')
  create(@Body() role: RoleEntity): Promise<RoleEntity> {
    return this.roleService.create(role);
  }

  @ApiBearerAuth()
  @Roles(Role.Admin)
  @Put('role/:id')
  update(
    @Param('id') id: number,
    @Body() role: RoleEntity,
  ): Promise<UpdateResult> {
    return this.roleService.update(id, role);
  }

  @ApiBearerAuth()
  @Roles(Role.Admin)
  @Delete('role/:id')
  deleteUser(@Param('id') id: number): Promise<DeleteResult> {
    return this.roleService.delete(id);
  }
}
