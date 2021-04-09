import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsNumberString } from 'class-validator';
import { Product } from 'src/product/product.entity';
import {
  Column,
  Entity,
  JoinColumn,
  OneToMany,
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
}
