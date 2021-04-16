import { Injectable } from '@nestjs/common';
import { Category } from './entities/category.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { UpdateResult, DeleteResult } from 'typeorm';

@Injectable()
export class CategoryService {
  constructor(
    @InjectRepository(Category)
    private readonly catRepo: Repository<Category>,
  ) {}

  async findAll(): Promise<Category[]> {
    return await this.catRepo.find();
  }

  async findOne(id: number): Promise<Category> {
    return await this.catRepo.findOne(id);
  }

  async create(category: Category): Promise<Category> {
    return await this.catRepo.save(category);
  }

  async update(id: number, category: Category): Promise<UpdateResult> {
    return await this.catRepo.update(id, category);
  }

  async delete(id: number): Promise<DeleteResult> {
    return await this.catRepo.delete(id);
  }
}
