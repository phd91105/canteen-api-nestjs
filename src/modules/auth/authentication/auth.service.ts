import { BadRequestException, Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { InjectRepository } from '@nestjs/typeorm';
<<<<<<< HEAD:src/modules/auth/authentication/auth.service.ts
import { UserEntity } from 'src/modules/user/entities/user.entity';
=======
import { UserEntity } from 'src/modules/user/user.entity';
>>>>>>> 9b12b87 (update struct):src/auth/authentication/auth.service.ts
import { Repository } from 'typeorm';
import * as bcrypt from 'bcrypt';
import { LoginDto } from './dto/login-auth.dto';
import { RegiterDto } from './dto/register-auth.dto';

@Injectable()
export class AuthService {
  constructor(
    @InjectRepository(UserEntity)
    private readonly userRepo: Repository<UserEntity>,
    private jwtService: JwtService,
  ) {}

  async register(user: RegiterDto): Promise<RegiterDto> {
    const username: string = user.username;
    const usr: UserEntity = await this.userRepo.findOne({ username });
    if (!usr) {
      const hashedPassword = await bcrypt.hash(user.password, 12);
      user.password = hashedPassword;
      return await this.userRepo.save(user);
    } else throw new BadRequestException('User Already Exists');
  }

  async login(user: LoginDto): Promise<Record<string, string>> {
    const emailRegex = /\S+@\S+\.\S+/;
    const { username, password } = user;
    const isEmail: boolean = emailRegex.test(username);
    const userInfo: UserEntity = !isEmail
      ? await this.userRepo.findOne({ username: username })
      : await this.userRepo.findOne({ email: username });
    if (!userInfo) {
      throw new BadRequestException('Invalid Username');
    }
    if (!(await bcrypt.compare(password, userInfo.password))) {
      throw new BadRequestException('Invalid Password');
    }
    const jwt: string = this.jwtService.sign({
      uid: userInfo.id,
      uname: userInfo.username,
      role: userInfo.role ? userInfo.role.name : 'user',
    });
    return { message: 'Login Successful', token: jwt };
  }
}
