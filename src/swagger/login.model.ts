import { ApiProperty } from '@nestjs/swagger';

export default class LoginModel {
  @ApiProperty({ type: String, description: 'username' })
  username: string;
  @ApiProperty({ type: String, description: 'password' })
  password: string;
}
