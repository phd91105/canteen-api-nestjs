import { ApiProperty } from '@nestjs/swagger';

export default class LoginModel {
  @ApiProperty({ type: String })
  username: string;

  @ApiProperty({ type: String })
  password: string;
}
