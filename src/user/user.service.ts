import { BadRequestException, Body, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { DeleteResult, Repository, UpdateResult } from 'typeorm';
import { UserEntity } from './user.entity';
import * as bcrypt from 'bcrypt';

@Injectable()
export class UserService {
  constructor(
    @InjectRepository(UserEntity)
    private readonly userRepo: Repository<UserEntity>,
  ) {}

  async findAll(): Promise<UserEntity[]> {
    return await this.userRepo.find();
  }
  async findOne(id: number): Promise<UserEntity> {
    return await this.userRepo.findOne(id);
  }

  async register(user: UserEntity): Promise<UserEntity> {
    const hashedPassword = await bcrypt.hash(user.password, 12);
    return this.userRepo.save({
      email: user.email,
      fullName: user.fullName,
      username: user.username,
      password: hashedPassword,
    });
  }

  async update(user: UserEntity): Promise<UpdateResult> {
    return await this.userRepo.update(user.id, user);
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
    return { userInfo: user, token: '' };
  }
}
