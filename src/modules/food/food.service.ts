import { Injectable } from '@nestjs/common';
import { FoodEntity } from './entities/food.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { UpdateResult, DeleteResult, Repository } from 'typeorm';
import { REST } from 'src/interfaces/rest.interface';

@Injectable()
export class FoodService implements REST {
  constructor(
    @InjectRepository(FoodEntity)
    private readonly foodRepo: Repository<FoodEntity>,
  ) {}

  async findAll(): Promise<FoodEntity[]> {
    return await this.foodRepo.find();
  }

  async findOne(id: number): Promise<FoodEntity> {
    return await this.foodRepo.findOne(id);
  }

  async create(food: FoodEntity): Promise<FoodEntity> {
    return await this.foodRepo.save(food);
  }

  async update(id: number, food: FoodEntity): Promise<UpdateResult> {
    return await this.foodRepo.update(id, food);
  }

  async delete(id: number): Promise<DeleteResult> {
    return await this.foodRepo.delete(id);
  }
}
