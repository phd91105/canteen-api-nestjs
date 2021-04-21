import { Injectable } from '@nestjs/common';
import { OrderEntity } from './entities/order.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { UpdateResult, DeleteResult, Repository } from 'typeorm';
import { IREST } from 'src/interfaces/rest.interface';

@Injectable()
export class OrderService implements IREST {
  constructor(
    @InjectRepository(OrderEntity)
    private readonly orderRepo: Repository<OrderEntity>,
  ) {}

  async findAll(): Promise<OrderEntity[]> {
    return await this.orderRepo.find();
  }

  async findOne(id: number): Promise<OrderEntity> {
    return await this.orderRepo.findOne(id);
  }

  async create(order: OrderEntity): Promise<OrderEntity> {
    return await this.orderRepo.save(order);
  }

  async update(id: number, order: OrderEntity): Promise<UpdateResult> {
    return await this.orderRepo.update(id, order);
  }

  async delete(id: number): Promise<DeleteResult> {
    return await this.orderRepo.delete(id);
  }
}
