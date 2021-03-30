import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  Put,
  UseGuards,
} from '@nestjs/common';
import { UserEntity } from './user.entity';
import { UserService } from './user.service';
import { JwtAuthGuard } from '../auth/jwt-auth.guard';

@Controller('v1/user')
export class UserController {
  constructor(private readonly userService: UserService) {}

  @Post('login')
  login(
    @Body('username') username: string,
    @Body('password') password: string,
  ) {
    return this.userService.login(username, password);
  }

  @Post('register')
  register(@Body() user: UserEntity) {
    return this.userService.register(user);
  }

  @UseGuards(JwtAuthGuard)
  @Get()
  findAll(): Promise<UserEntity[]> {
    return this.userService.findAll();
  }

  @UseGuards(JwtAuthGuard)
  @Get(':id')
  get(@Param() id: number) {
    return this.userService.findOne(id);
  }

  @UseGuards(JwtAuthGuard)
  @Put()
  update(@Body() user: UserEntity) {
    return this.userService.update(user);
  }

  @UseGuards(JwtAuthGuard)
  @Delete(':id')
  deleteUser(@Param('id') id: number) {
    return this.userService.delete(id);
  }
}
