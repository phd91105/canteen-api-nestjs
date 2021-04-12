import { ApiProperty } from '@nestjs/swagger';
import {
  Column,
  Entity,
  ManyToOne,
  OneToMany,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { IsNotEmpty } from 'class-validator';
import { OrderDetail } from '../orderdetail/orderdetail.entity';
import { User } from '../user/user.entity';

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

  @OneToMany(() => OrderDetail, (orderDetail: OrderDetail) => orderDetail.id)
  orderDetail: OrderDetail[];

  @ManyToOne(() => User, (user: User) => user.id)
  user: User;
}
