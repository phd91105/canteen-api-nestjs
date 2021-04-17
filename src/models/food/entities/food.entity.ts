import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsNumberString, IsString } from 'class-validator';
import { Category } from '../../category/entities/category.entity';
import { OrderDetail } from '../../orderdetail/entities/orderdetail.entity';
import {
  Column,
  Entity,
  JoinColumn,
  ManyToOne,
  OneToMany,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { Cart } from 'src/models/cart/entities/cart.entity';

@Entity()
export class Food {
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
  @ManyToOne(() => Category, () => Category, {
    eager: true,
    cascade: true,
  })
  @JoinColumn()
  category: Category;

  @OneToMany(() => OrderDetail, (orderDetail: OrderDetail) => orderDetail.id)
  orderDetail: OrderDetail[];

  @OneToMany(() => Cart, (cart: Cart) => cart.id)
  cart: Cart[];
}
