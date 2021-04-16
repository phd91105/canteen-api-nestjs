import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
export class Cart {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  foodId: number;

  @Column()
  quantity: number;

  @Column()
  price: number;
}
