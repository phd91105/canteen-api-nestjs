import { Injectable } from '@nestjs/common';
import { OrderDetailEntity } from './entities/orderdetail.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository, UpdateResult, DeleteResult } from 'typeorm';

@Injectable()
export class OrderDetailService {
  constructor(
    @InjectRepository(OrderDetailEntity)
    private readonly orderdetailRepo: Repository<OrderDetailEntity>,
  ) {}

  async findAll(): Promise<OrderDetailEntity[]> {
    return await this.orderdetailRepo.find();
  }

  async findOne(id: number): Promise<OrderDetailEntity> {
    return await this.orderdetailRepo.findOne(id);
  }

  async create(orderdetail: OrderDetailEntity): Promise<OrderDetailEntity> {
    return await this.orderdetailRepo.save(orderdetail);
  }

  async update(
    id: number,
    orderdetail: OrderDetailEntity,
  ): Promise<UpdateResult> {
    return await this.orderdetailRepo.update(id, orderdetail);
  }

  async delete(id: number): Promise<DeleteResult> {
    return await this.orderdetailRepo.delete(id);
  }
}
