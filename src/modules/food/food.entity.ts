import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsNumber, IsString } from 'class-validator';
import { CategoryEntity } from 'src/modules/category/category.entity';
import { OrderDetailEntity } from 'src/modules/orderdetail/orderdetail.entity';
import {
  Column,
  Entity,
  JoinColumn,
  ManyToOne,
  OneToMany,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { CartEntity } from 'src/modules/cart/cart.entity';

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
  @IsNumber()
  @ApiProperty({ type: Number })
  @Column()
  price: number;

  @Column()
  image: string;

  @IsNotEmpty()
  @IsNumber()
  @ApiProperty({ type: Number })
  @ManyToOne(() => CategoryEntity, {
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
