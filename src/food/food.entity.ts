import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsNumberString, IsString } from 'class-validator';
import { Category } from 'src/category/category.entity';
import { OrderDetail } from 'src/orderdetail/orderdetail.entity';
import {
  Column,
  Entity,
  JoinColumn,
  ManyToOne,
  OneToMany,
  PrimaryGeneratedColumn,
} from 'typeorm';

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

  @IsNumberString()
  @ApiProperty({ type: Number })
  @Column()
  stock: number;

  @IsNumberString()
  @Column()
  viewCount: number;

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
}
