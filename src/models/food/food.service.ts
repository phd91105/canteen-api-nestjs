import { Injectable } from '@nestjs/common';
import { Food } from './entities/food.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { UpdateResult, DeleteResult } from 'typeorm';

@Injectable()
export class FoodService {
  constructor(
    @InjectRepository(Food)
    private readonly foodRepo: Repository<Food>,
  ) {}

  async findAll(): Promise<Food[]> {
    return await this.foodRepo.find();
  }

  async findOne(id: number): Promise<Food> {
    return await this.foodRepo.findOne(id);
  }

  async create(food: Food): Promise<Food> {
    return await this.foodRepo.save(food);
  }

  async update(id: number, food: Food): Promise<UpdateResult> {
    return await this.foodRepo.update(id, food);
  }

  async delete(id: number): Promise<DeleteResult> {
    return await this.foodRepo.delete(id);
  }
}
