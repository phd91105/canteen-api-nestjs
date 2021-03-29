import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { DeleteResult, Repository, UpdateResult } from 'typeorm';
import { UserEntity } from './user.entity';

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

  async create(user: UserEntity): Promise<UserEntity> {
    return await this.userRepo.save(user);
  }

  async update(user: UserEntity): Promise<UpdateResult> {
    return await this.userRepo.update(user.id, user);
  }

  async delete(id: number): Promise<DeleteResult> {
    return await this.userRepo.delete(id);
  }
}
