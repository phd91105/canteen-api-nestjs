import { Injectable } from '@nestjs/common';
import { Role } from './entities/role.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { UpdateResult, DeleteResult } from 'typeorm';

@Injectable()
export class RoleService {
  constructor(
    @InjectRepository(Role)
    private readonly roleRepo: Repository<Role>,
  ) {}

  async findAll(): Promise<Role[]> {
    return await this.roleRepo.find();
  }

  async findOne(id: number): Promise<Role> {
    return await this.roleRepo.findOne(id);
  }

  async create(role: Role): Promise<Role> {
    return await this.roleRepo.save(role);
  }

  async update(id: number, role: Role): Promise<UpdateResult> {
    return await this.roleRepo.update(id, role);
  }

  async delete(id: number): Promise<DeleteResult> {
    return await this.roleRepo.delete(id);
  }
}
