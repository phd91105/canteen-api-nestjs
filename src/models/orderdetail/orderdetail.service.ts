import { Injectable } from '@nestjs/common';
import { OrderDetail } from './entities/orderdetail.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { UpdateResult, DeleteResult } from 'typeorm';

@Injectable()
export class OrderDetailService {
  constructor(
    @InjectRepository(OrderDetail)
    private readonly orderdetailRepo: Repository<OrderDetail>,
  ) {}

  async findAll(): Promise<OrderDetail[]> {
    return await this.orderdetailRepo.find();
  }

  async findOne(id: number): Promise<OrderDetail> {
    return await this.orderdetailRepo.findOne(id);
  }

  async create(orderdetail: OrderDetail): Promise<OrderDetail> {
    return await this.orderdetailRepo.save(orderdetail);
  }

  async update(id: number, orderdetail: OrderDetail): Promise<UpdateResult> {
    return await this.orderdetailRepo.update(id, orderdetail);
  }

  async delete(id: number): Promise<DeleteResult> {
    return await this.orderdetailRepo.delete(id);
  }
}
