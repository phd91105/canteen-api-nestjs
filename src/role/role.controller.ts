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

@Controller()
export class RoleController {
  constructor(private readonly roleService: RoleService) {}

  @Get('roles')
  findAll(): Promise<Role[]> {
    return this.roleService.findAll();
  }

  @Get('role/:id')
  get(@Param('id') id: number) {
    return this.roleService.findOne(id);
  }

  @ApiBody({ type: Role })
  @Post('role')
  create(@Body() role: Role) {
    return this.roleService.create(role);
  }

  @Put('role/:id')
  update(@Param('id') id: number, @Body() role: Role) {
    return this.roleService.update(id, role);
  }

  @Delete('role/:id')
  deleteUser(@Param('id') id: number) {
    return this.roleService.delete(id);
  }
}
