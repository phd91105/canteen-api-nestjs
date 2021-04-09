import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsNumberString, IsString } from 'class-validator';
import { Cart } from 'src/cart/cart.entity';
import { Category } from 'src/category/category.entity';
import {
  Column,
  Entity,
  JoinColumn,
  ManyToOne,
  OneToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';

@Entity()
export class Product {
  @PrimaryGeneratedColumn()
  public id: number;

  @IsNotEmpty()
  @IsString()
  @ApiProperty({ type: String })
  @Column()
  public name: string;

  @IsString()
  @ApiProperty({ type: String })
  @Column()
  public desc: string;

  @IsString()
  @ApiProperty({ type: String })
  @Column()
  public details: string;

  @IsNotEmpty()
  @IsNumberString()
  @ApiProperty({ type: Number })
  @Column()
  public price: number;

  @IsNumberString()
  @ApiProperty({ type: Number })
  @Column()
  public stock: number;

  @IsNumberString()
  @ApiProperty({ type: Number })
  @Column()
  public viewCount: number;

  @IsNotEmpty()
  @ApiProperty({ type: Number })
  @OneToOne(() => Category, {
    eager: true,
    cascade: true,
  })
  @JoinColumn()
  public category: Category;

  @IsNotEmpty()
  @ManyToOne(() => Cart, (cart: Cart) => cart.product)
  public cart: Cart;
}
