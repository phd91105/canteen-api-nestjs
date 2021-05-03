import { Injectable } from '@nestjs/common';
import { CategoryEntity } from './category.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { UpdateResult, DeleteResult, Repository } from 'typeorm';
import { REST } from 'src/interfaces/rest.interface';

@Injectable()
export class CategoryService implements REST {
  constructor(
    @InjectRepository(CategoryEntity)
    private readonly catRepo: Repository<CategoryEntity>,
  ) {}

  async findAll(): Promise<CategoryEntity[]> {
    return await this.catRepo.find();
  }

  async findOne(id: number): Promise<CategoryEntity> {
    return await this.catRepo.findOne(id);
  }

  async create(category: CategoryEntity): Promise<CategoryEntity> {
    return await this.catRepo.save(category);
  }

  async update(id: number, category: CategoryEntity): Promise<UpdateResult> {
    return await this.catRepo.update(id, category);
  }

  async delete(id: number): Promise<DeleteResult> {
    return await this.catRepo.delete(id);
  }
}
