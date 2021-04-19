import { Body, Controller, Post, ValidationPipe } from '@nestjs/common';
import { ApiBody, ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty } from 'class-validator';
import { UserEntity } from 'src/models/user/entities/user.entity';
import { AuthService } from './auth.service';

export class LoginModel {
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
  @ApiBody({ type: LoginModel })
  login(
    @Body(new ValidationPipe()) user: LoginModel,
  ): Promise<Record<string, string>> {
    return this.authService.login(user);
  }

  @Post('register')
  @ApiBody({ type: UserEntity })
  register(@Body(new ValidationPipe()) user: UserEntity): Promise<UserEntity> {
    return this.authService.register(user);
  }
}
