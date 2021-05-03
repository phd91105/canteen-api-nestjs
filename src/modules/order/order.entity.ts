import { ApiProperty } from '@nestjs/swagger';
import {
  Column,
  Entity,
  ManyToOne,
  OneToMany,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { IsNotEmpty, IsNumber } from 'class-validator';
<<<<<<< HEAD:src/modules/order/entities/order.entity.ts
import { OrderDetailEntity } from 'src/modules/orderdetail/entities/orderdetail.entity';
import { UserEntity } from 'src/modules/user/entities/user.entity';
=======
import { OrderDetailEntity } from 'src/modules/orderdetail/orderdetail.entity';
import { UserEntity } from 'src/modules/user/user.entity';
>>>>>>> 9b12b87 (update struct):src/modules/order/order.entity.ts

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
