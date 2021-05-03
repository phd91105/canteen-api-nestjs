import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsNumber, IsString } from 'class-validator';
<<<<<<< HEAD:src/modules/food/entities/food.entity.ts
import { CategoryEntity } from 'src/modules/category/entities/category.entity';
import { OrderDetailEntity } from 'src/modules/orderdetail/entities/orderdetail.entity';
=======
import { CategoryEntity } from 'src/modules/category/category.entity';
import { OrderDetailEntity } from 'src/modules/orderdetail/orderdetail.entity';
>>>>>>> 9b12b87 (update struct):src/modules/food/food.entity.ts
import {
  Column,
  Entity,
  JoinColumn,
  ManyToOne,
  OneToMany,
  PrimaryGeneratedColumn,
} from 'typeorm';
<<<<<<< HEAD:src/modules/food/entities/food.entity.ts
import { CartEntity } from 'src/modules/cart/entities/cart.entity';
=======
import { CartEntity } from 'src/modules/cart/cart.entity';
>>>>>>> 9b12b87 (update struct):src/modules/food/food.entity.ts

@Entity()
export class FoodEntity {
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
  @IsNumber()
  @ApiProperty({ type: Number })
  @Column()
  price: number;

  @Column()
  image: string;

  @IsNotEmpty()
  @IsNumber()
  @ApiProperty({ type: Number })
  @ManyToOne(() => CategoryEntity, {
    eager: true,
    cascade: true,
  })
  @JoinColumn()
  category: CategoryEntity;

  @OneToMany(
    () => OrderDetailEntity,
    (orderDetail: OrderDetailEntity) => orderDetail.id,
  )
  orderDetail: OrderDetailEntity[];

  @OneToMany(() => CartEntity, (cart: CartEntity) => cart.id)
  cart: CartEntity[];
}
