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
import { User } from './entities/user.entity';
import { UserService } from './user.service';
import { ApiBearerAuth, ApiBody, ApiProperty, ApiTags } from '@nestjs/swagger';
import { JwtAuthGuard } from '../../auth/jwt-auth.guard';
import { IsNotEmpty } from 'class-validator';

export class LoginModel {
  @IsNotEmpty()
  @ApiProperty({ type: String })
  readonly username: string;

  @IsNotEmpty()
  @ApiProperty({ type: String })
  readonly password: string;
}

@Controller()
@ApiTags('User')
export class UserController {
  constructor(private readonly userService: UserService) {}

  @Post('login')
  @ApiBody({ type: LoginModel })
  login(@Body(new ValidationPipe()) user: LoginModel) {
    return this.userService.login(user);
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
