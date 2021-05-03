import { Injectable, NotFoundException } from '@nestjs/common';
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
    if (await this.userRepo.findOne(id)) {
      return this.userRepo.findOne(id);
    } else throw new NotFoundException();
  }

  async update(id: number, user: UserEntity): Promise<UpdateResult> {
    const hashedPassword = await bcrypt.hash(user.password, 12);
    user.password = hashedPassword;
    return await this.userRepo.update(id, user);
  }

  async delete(id: number): Promise<DeleteResult> {
    return await this.userRepo.delete(id);
  }
}
