import {
  BadRequestException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { DeleteResult, Repository, UpdateResult } from 'typeorm';
import { UserEntity } from './user.entity';
import * as bcrypt from 'bcrypt';
import { JwtService } from '@nestjs/jwt';

@Injectable()
export class UserService {
  constructor(
    @InjectRepository(UserEntity)
    private readonly userRepo: Repository<UserEntity>,
    private jwtService: JwtService,
  ) {}

  async findAll(): Promise<UserEntity[]> {
    return await this.userRepo.find();
  }
  async findOne(id: number): Promise<any> {
    if (await this.userRepo.findOne(id)) {
      return this.userRepo.findOne(id);
    } else throw new NotFoundException();
  }

  async register(user: UserEntity): Promise<any> {
    const username = user.username;
    const usr = await this.userRepo.findOne({ username });
    if (!usr) {
      const hashedPassword = await bcrypt.hash(user.password, 12);
      user.password = hashedPassword;
      return await this.userRepo.save(user);
    } else throw new BadRequestException('user already exists');
  }

  async update({
    id,
    user,
  }: {
    id: number;
    user: UserEntity;
  }): Promise<UpdateResult> {
    return await this.userRepo.update(id, user);
  }

  async delete(id: number): Promise<DeleteResult> {
    return await this.userRepo.delete(id);
  }

  async login(username: string, password: string): Promise<any> {
    const regex = /\S+@\S+\.\S+/;
    const isEmail = regex.test(username);
    const user = !isEmail
      ? await this.userRepo.findOne({ username })
      : await this.userRepo.findOne({ email: username });
    if (!user) {
      throw new BadRequestException('invalid username');
    }
    if (!(await bcrypt.compare(password, user.password))) {
      throw new BadRequestException('invalid password');
    }
    const jwt = this.jwtService.sign({ id: user.id });
    return { msg: 'login successful', token: jwt };
  }
}
