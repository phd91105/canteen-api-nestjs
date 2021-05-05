import { Body, Controller, Post } from '@nestjs/common';
import { ApiBody } from '@nestjs/swagger';
import { AuthService } from './auth.service';
import { LoginDto } from './dto/login-auth.dto';
import { RegiterDto } from './dto/register-auth.dto';

@Controller()
export class AuthController {
  constructor(private readonly authService: AuthService) {}
  @Post('login')
  @ApiBody({ type: LoginDto })
  async login(@Body() user: LoginDto): Promise<Record<string, string>> {
    return this.authService.login(user);
  }

  @Post('register')
  @ApiBody({ type: RegiterDto })
  async register(@Body() user: RegiterDto): Promise<RegiterDto> {
    return this.authService.register(user);
  }
}
