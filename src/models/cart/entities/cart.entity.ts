import { FoodEntity } from 'src/models/food/entities/food.entity';
import { UserEntity } from 'src/models/user/entities/user.entity';
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

  @ManyToOne(() => FoodEntity, () => FoodEntity, {
    eager: true,
    cascade: true,
  })
  @JoinColumn()
  food: FoodEntity;

  @ManyToOne(() => UserEntity, () => UserEntity, {
    eager: true,
    cascade: true,
  })
  @JoinColumn()
  user: UserEntity;
}
