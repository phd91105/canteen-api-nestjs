import { FoodEntity } from 'src/modules/food/food.entity';
import { UserEntity } from 'src/modules/user/user.entity';
import {
  Column,
  Entity,
  JoinColumn,
  ManyToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';

@Entity()
export class CartEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  quantity: number;

  @Column()
  price: number;

  @ManyToOne(() => FoodEntity, {
    eager: true,
    cascade: true,
  })
  @JoinColumn()
  food: FoodEntity;

  @ManyToOne(() => UserEntity, {
    eager: true,
    cascade: true,
  })
  @JoinColumn()
  user: UserEntity;
}
