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

@Controller('v1')
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
  @Get('users')
  findAll(): Promise<UserEntity[]> {
    return this.userService.findAll();
  }

  @UseGuards(JwtAuthGuard)
  @Get('user/:id')
  get(@Param() id: number) {
    return this.userService.findOne(id);
  }

  @UseGuards(JwtAuthGuard)
  @Put('user/:id')
  update(@Param('id') id: number, @Body() user: UserEntity) {
    return this.userService.update(id, user);
  }

  @UseGuards(JwtAuthGuard)
  @Delete('user/:id')
  deleteUser(@Param('id') id: number) {
    return this.userService.delete(id);
  }
}
