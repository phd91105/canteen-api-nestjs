import { ApiProperty } from '@nestjs/swagger';
import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from 'typeorm';
import { IsNotEmpty } from 'class-validator';
<<<<<<< HEAD:src/modules/category/entities/category.entity.ts
import { FoodEntity } from 'src/modules/food/entities/food.entity';
=======
import { FoodEntity } from 'src/modules/food/food.entity';
>>>>>>> 9b12b87 (update struct):src/modules/category/category.entity.ts

@Entity()
export class CategoryEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  @IsNotEmpty()
  @ApiProperty({ type: String })
  name: string;

  @Column()
  @ApiProperty({ type: String })
  desc: string;

  @OneToMany(() => FoodEntity, (food: FoodEntity) => food.id)
  food: FoodEntity[];
}
