import { BadRequestException, Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { InjectRepository } from '@nestjs/typeorm';
import { UserEntity } from 'src/models/user/entities/user.entity';
import { Repository } from 'typeorm';
import * as bcrypt from 'bcrypt';
import { LoginDto } from './auth.controller';

@Injectable()
export class AuthService {
  constructor(
    @InjectRepository(UserEntity)
    private readonly userRepo: Repository<UserEntity>,
    private jwtService: JwtService,
  ) {}

  async register(user: UserEntity): Promise<UserEntity> {
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
      role: userInfo.role.name,
    });
    return { message: 'Login Successful', token: jwt };
  }
}
