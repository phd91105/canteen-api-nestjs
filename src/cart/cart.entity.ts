import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsNumberString } from 'class-validator';
import { Order } from 'src/order/order.entity';
import { Product } from 'src/product/product.entity';
import {
  Column,
  Entity,
  JoinColumn,
  OneToMany,
  OneToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';

@Entity()
export class Cart {
  @PrimaryGeneratedColumn()
  public id: number;

  @IsNotEmpty()
  @IsNumberString()
  @Column()
  public quantity: number;

  @IsNotEmpty()
  @ApiProperty({ type: Number })
  @OneToMany(() => Product, (product: Product) => product.cart)
  @JoinColumn()
  public product: Product[];

  @OneToOne(() => Order, (order: Order) => order.id)
  public order: Order;
}
