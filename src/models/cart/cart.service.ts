import { Injectable } from '@nestjs/common';
import { Cart } from './entities/cart.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { UpdateResult, DeleteResult } from 'typeorm';

@Injectable()
export class CartService {
  constructor(
    @InjectRepository(Cart)
    private readonly cartRepo: Repository<Cart>,
  ) {}

  async findAll(): Promise<Cart[]> {
    return await this.cartRepo.find();
  }

  async findOne(id: number): Promise<Cart> {
    return await this.cartRepo.findOne(id);
  }

  async create(cart: Cart): Promise<Cart> {
    return await this.cartRepo.save(cart);
  }

  async update(id: number, cart: Cart): Promise<UpdateResult> {
    return await this.cartRepo.update(id, cart);
  }

  async delete(id: number): Promise<DeleteResult> {
    return await this.cartRepo.delete(id);
  }
}
