import { Entity, PrimaryGeneratedColumn } from 'typeorm';
import { ApiProperty } from '@nestjs/swagger';

@Entity()
export class ProductEntity {
  @ApiProperty({ type: Number, description: 'id' })
  @PrimaryGeneratedColumn()
  public id: number;
}
