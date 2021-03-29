import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  Put,
} from '@nestjs/common';
import { UserEntity } from './user.entity';
import { UserService } from './user.service';

@Controller('api/user')
export class UserController {
  constructor(private readonly userService: UserService) {}

  @Get()
  findAll(): Promise<UserEntity[]> {
    return this.userService.findAll();
  }

  @Get(':id')
  get(@Param() params) {
    return this.userService.findOne(params.id);
  }

  @Post()
  create(@Body() task: UserEntity) {
    return this.userService.create(task);
  }

  @Put()
  update(@Body() task: UserEntity) {
    return this.userService.update(task);
  }

  @Delete(':id')
  deleteUser(@Param() params) {
    return this.userService.delete(params.id);
  }
}
