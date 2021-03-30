import { BadRequestException, Injectable } from '@nestjs/common';
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
  async findOne(id: number): Promise<UserEntity> {
    return await this.userRepo.findOne(id);
  }

  async register(user: UserEntity): Promise<UserEntity> {
    const hashedPassword = await bcrypt.hash(user.password, 12);
    return await this.userRepo.save({
      email: user.email,
      fullName: user.fullName,
      username: user.username,
      password: hashedPassword,
    });
  }

  async update(id: number, user: UserEntity): Promise<UpdateResult> {
    return await this.userRepo.update(id, user);
  }

  async delete(id: number): Promise<DeleteResult> {
    return await this.userRepo.delete(id);
  }

  async login(username: string, password: string): Promise<any> {
    const user = await this.userRepo.findOne({ username });
    if (!user) {
      throw new BadRequestException('Invalid username');
    }
    if (!(await bcrypt.compare(password, user.password))) {
      throw new BadRequestException('Invalid password');
    }
    const jwt = this.jwtService.sign({ id: user.id });
    delete user.password;
    return { userInfo: user, access_token: jwt };
  }
}
