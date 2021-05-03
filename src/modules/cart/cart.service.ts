import { Injectable } from '@nestjs/common';
import { CartEntity } from './cart.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { UpdateResult, DeleteResult, Repository } from 'typeorm';

@Injectable()
export class CartService {
  constructor(
    @InjectRepository(CartEntity)
    private readonly cartRepo: Repository<CartEntity>,
  ) {}

  async findAll(): Promise<CartEntity[]> {
    return await this.cartRepo.find();
  }

  async findOne(id: number): Promise<CartEntity> {
    return await this.cartRepo.findOne(id);
  }

  async create(cart: CartEntity): Promise<CartEntity> {
    return await this.cartRepo.save(cart);
  }

  async update(id: number, cart: CartEntity): Promise<UpdateResult> {
    return await this.cartRepo.update(id, cart);
  }

  async delete(id: number): Promise<DeleteResult> {
    return await this.cartRepo.delete(id);
  }
}
