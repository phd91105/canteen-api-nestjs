import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsNumber, IsString } from 'class-validator';
import { OrderEntity } from 'src/modules/order/order.entity';
import { FoodEntity } from 'src/modules/food/food.entity';
import { Column, Entity, ManyToOne, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
export class OrderDetailEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @IsNotEmpty()
  @IsString()
  @ApiProperty({ type: String })
  @Column()
  name: string;

  @IsString()
  @IsNotEmpty()
  @IsNumber()
  @ApiProperty({ type: Number })
  @Column()
  price: number;

  @IsString()
  @IsNotEmpty()
  @IsNumber()
  @ApiProperty({ type: Number })
  @Column()
  quantity: number;

  @ManyToOne(() => OrderEntity, (order: OrderEntity) => order.id)
  order: OrderEntity;

  @ManyToOne(() => FoodEntity, (food: FoodEntity) => food.id)
  food: FoodEntity;
}
