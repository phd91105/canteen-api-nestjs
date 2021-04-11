import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsString } from 'class-validator';
import { Order } from 'src/order/order.entity';
import { Product } from 'src/product/product.entity';
import { Column, Entity, ManyToOne, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
export class OrderDetail {
  @PrimaryGeneratedColumn()
  id: number;

  @IsNotEmpty()
  @IsString()
  @ApiProperty({ type: String })
  @Column()
  name: string;

  @IsString()
  @IsNotEmpty()
  @ApiProperty({ type: Number })
  @Column()
  price: number;

  @IsString()
  @IsNotEmpty()
  @ApiProperty({ type: Number })
  @Column()
  quantity: number;

  @ManyToOne(() => Order, (order: Order) => order.id)
  public order: Order;

  @ManyToOne(() => Product, (product: Product) => product.id)
  public product: Product;
}
