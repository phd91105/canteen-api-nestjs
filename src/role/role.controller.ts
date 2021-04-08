import {
  Controller,
  Get,
  Post,
  Put,
  Delete,
  Body,
  Param,
} from '@nestjs/common';
import { RoleService } from './role.service';
import { Role } from './role.entity';
import { ApiBody } from '@nestjs/swagger';

@Controller('roles')
export class RoleController {
  constructor(private readonly roleService: RoleService) {}

  @Get()
  findAll(): Promise<Role[]> {
    return this.roleService.findAll();
  }

  @Get(':id')
  get(@Param() params) {
    return this.roleService.findOne(params.id);
  }
  @ApiBody({ type: Role })
  @Post()
  create(@Body() role: Role) {
    return this.roleService.create(role);
  }

  @Put()
  update(@Body() role: Role) {
    return this.roleService.update(role);
  }

  @Delete(':id')
  deleteUser(@Param() params) {
    return this.roleService.delete(params.id);
  }
}
