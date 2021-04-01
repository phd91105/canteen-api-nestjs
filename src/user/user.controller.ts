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
import { ApiBearerAuth, ApiBody } from '@nestjs/swagger';

@Controller()
export class UserController {
  constructor(private readonly userService: UserService) {}

  @Post('login')
  @ApiBody({ type: UserEntity })
  login(
    @Body('username') username: string,
    @Body('password') password: string,
  ) {
    return this.userService.login(username, password);
  }

  @Post('register')
  @ApiBody({ type: UserEntity })
  register(@Body() user: UserEntity) {
    return this.userService.register(user);
  }

  @ApiBearerAuth()
  @UseGuards(JwtAuthGuard)
  @Get('users')
  findAll(): Promise<UserEntity[]> {
    return this.userService.findAll();
  }

  @ApiBearerAuth()
  @UseGuards(JwtAuthGuard)
  @Get('user/:id')
  get(@Param('id') id: number) {
    return this.userService.findOne(id);
  }

  @ApiBearerAuth()
  @UseGuards(JwtAuthGuard)
  @Put('user/:id')
  update(@Param('id') id: number, @Body() user: UserEntity) {
    return this.userService.update({ id, user });
  }

  @ApiBearerAuth()
  @UseGuards(JwtAuthGuard)
  @Delete('user/:id')
  deleteUser(@Param('id') id: number) {
    return this.userService.delete(id);
  }
}
