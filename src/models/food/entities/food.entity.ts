import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsNumberString, IsString } from 'class-validator';
import { CategoryEntity } from '../../category/entities/category.entity';
import { OrderDetailEntity } from '../../orderdetail/entities/orderdetail.entity';
import {
  Column,
  Entity,
  JoinColumn,
  ManyToOne,
  OneToMany,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { CartEntity } from '../../../models/cart/entities/cart.entity';

@Entity()
export class FoodEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @IsNotEmpty()
  @IsString()
  @ApiProperty({ type: String })
  @Column()
  name: string;

  @IsString()
  @ApiProperty({ type: String })
  @Column()
  desc: string;

  @IsString()
  @ApiProperty({ type: String })
  @Column()
  detail: string;

  @IsNotEmpty()
  @IsNumberString()
  @ApiProperty({ type: Number })
  @Column()
  price: number;

  @Column()
  image: string;

  @IsNotEmpty()
  @ApiProperty({ type: Number })
  @ManyToOne(() => CategoryEntity, () => CategoryEntity, {
    eager: true,
    cascade: true,
  })
  @JoinColumn()
  category: CategoryEntity;

  @OneToMany(
    () => OrderDetailEntity,
    (orderDetail: OrderDetailEntity) => orderDetail.id,
  )
  orderDetail: OrderDetailEntity[];

  @OneToMany(() => CartEntity, (cart: CartEntity) => cart.id)
  cart: CartEntity[];
}
