import { Food } from '../../../models/food/entities/food.entity';
import { User } from '../../../models/user/entities/user.entity';
import {
  Column,
  Entity,
  JoinColumn,
  ManyToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';

@Entity()
export class Cart {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  quantity: number;

  @Column()
  price: number;

  @ManyToOne(() => Food, () => Food, {
    eager: true,
    cascade: true,
  })
  @JoinColumn()
  food: Food;

  @ManyToOne(() => User, () => User, {
    eager: true,
    cascade: true,
  })
  @JoinColumn()
  user: User;
}
