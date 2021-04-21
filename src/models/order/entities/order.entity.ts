import { ApiProperty } from '@nestjs/swagger';
import {
  Column,
  Entity,
  ManyToOne,
  OneToMany,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { IsNotEmpty, IsNumber } from 'class-validator';
import { OrderDetailEntity } from 'src/orderdetail/entities/orderdetail.entity';
import { UserEntity } from 'src/user/entities/user.entity';

@Entity()
export class OrderEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  @IsNotEmpty()
  @ApiProperty({ type: String })
  address: string;

  @Column()
  @IsNumber()
  @ApiProperty({ type: Number })
  phone: number;

  @Column()
  @ApiProperty({ type: String })
  status: string;

  @OneToMany(
    () => OrderDetailEntity,
    (orderDetail: OrderDetailEntity) => orderDetail.id,
  )
  orderDetail: OrderDetailEntity[];

  @ManyToOne(() => UserEntity, (user: UserEntity) => user.id)
  user: UserEntity;
}
