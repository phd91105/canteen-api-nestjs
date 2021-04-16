import { ApiProperty } from '@nestjs/swagger';
import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from 'typeorm';
import { IsNotEmpty } from 'class-validator';
import { Food } from '../../food/entities/food.entity';

@Entity()
export class Category {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  @IsNotEmpty()
  @ApiProperty({ type: String })
  name: string;

  @Column()
  @ApiProperty({ type: String })
  desc: string;

  @OneToMany(() => Food, (food: Food) => food.id)
  food: Food[];
}
