import { ApiProperty } from '@nestjs/swagger';
import {
  Column,
  Entity,
  JoinColumn,
  OneToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { IsNotEmpty } from 'class-validator';
import { Cart } from 'src/cart/cart.entity';

@Entity()
export class Order {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  @IsNotEmpty()
  @ApiProperty({ type: String })
  address: string;

  @Column()
  @ApiProperty({ type: Number })
  phone: number;

  @Column()
  @ApiProperty({ type: String })
  status: string;

  @OneToOne(() => Cart, {
    eager: true,
    cascade: true,
  })
  @JoinColumn()
  public cart: Cart;
}
