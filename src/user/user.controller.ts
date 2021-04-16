import {
  Body,
  Controller,
  Get,
  Post,
  Put,
  Delete,
  Param,
  UseGuards,
  ValidationPipe,
} from '@nestjs/common';
import { User } from './user.entity';
import { UserService } from './user.service';
import { JwtAuthGuard } from '../auth/jwt-auth.guard';
import { ApiBearerAuth, ApiBody, ApiProperty, ApiTags } from '@nestjs/swagger';

export class LoginModel {
  @ApiProperty({ type: String })
  readonly username: string;
  @ApiProperty({ type: String })
  readonly password: string;
}

@Controller()
@ApiTags('User')
export class UserController {
  constructor(private readonly userService: UserService) {}

  @Post('login')
  @ApiBody({ type: LoginModel })
  login(
    @Body('username') username: string,
    @Body('password') password: string,
  ) {
    return this.userService.login(username, password);
  }

  @Post('register')
  @ApiBody({ type: User })
  register(@Body(new ValidationPipe()) user: User) {
    return this.userService.register(user);
  }

  @ApiBearerAuth()
  @UseGuards(JwtAuthGuard)
  @Get('users')
  findAll(): Promise<User[]> {
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
  update(@Param('id') id: number, @Body() user: User) {
    return this.userService.update(id, user);
  }

  @ApiBearerAuth()
  @UseGuards(JwtAuthGuard)
  @Delete('user/:id')
  deleteUser(@Param('id') id: number) {
    return this.userService.delete(id);
  }
}
