import { Body, Controller, Post } from '@nestjs/common';
import { ApiBody, ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty } from 'class-validator';
import { UserEntity } from 'src/models/user/entities/user.entity';
import { AuthService } from './auth.service';

export class LoginDto {
  @IsNotEmpty()
  @ApiProperty({ type: String })
  readonly username: string;

  @IsNotEmpty()
  @ApiProperty({ type: String })
  readonly password: string;
}

@Controller()
export class AuthController {
  constructor(private readonly authService: AuthService) {}
  @Post('login')
  @ApiBody({ type: LoginDto })
  async login(@Body() user: LoginDto): Promise<Record<string, string>> {
    return this.authService.login(user);
  }

  @Post('register')
  @ApiBody({ type: UserEntity })
  async register(@Body() user: UserEntity): Promise<UserEntity> {
    return this.authService.register(user);
  }
}
