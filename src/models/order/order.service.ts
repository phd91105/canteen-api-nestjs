import { Injectable } from '@nestjs/common';
import { Order } from './entities/order.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { UpdateResult, DeleteResult } from 'typeorm';

@Injectable()
export class OrderService {
  constructor(
    @InjectRepository(Order)
    private readonly orderRepo: Repository<Order>,
  ) {}

  async findAll(): Promise<Order[]> {
    return await this.orderRepo.find();
  }

  async findOne(id: number): Promise<Order> {
    return await this.orderRepo.findOne(id);
  }

  async create(order: Order): Promise<Order> {
    return await this.orderRepo.save(order);
  }

  async update(id: number, order: Order): Promise<UpdateResult> {
    return await this.orderRepo.update(id, order);
  }

  async delete(id: number): Promise<DeleteResult> {
    return await this.orderRepo.delete(id);
  }
}
