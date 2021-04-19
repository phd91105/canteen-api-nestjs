import {
  Column,
  Entity,
  JoinColumn,
  ManyToOne,
  OneToMany,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { IsEmail, IsNotEmpty, IsString } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';
import { RoleEntity } from '../../role/entities/role.entity';
import { OrderEntity } from '../../order/entities/order.entity';

@Entity()
export class UserEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @IsString()
  @IsEmail()
  @IsNotEmpty()
  @ApiProperty({ type: String })
  @Column()
  email: string;

  @IsString()
  @IsNotEmpty()
  @ApiProperty({ type: String })
  @Column({ length: 50 })
  fullName: string;

  @IsString()
  @IsNotEmpty()
  @ApiProperty({ type: String })
  @Column()
  username: string;

  @IsString()
  @IsNotEmpty()
  @ApiProperty({ type: String })
  @Column()
  password: string;

  @ApiProperty({ type: Number })
  @ManyToOne(() => RoleEntity, () => RoleEntity, {
    eager: true,
    cascade: true,
  })
  @JoinColumn()
  role: RoleEntity;

  @OneToMany(() => OrderEntity, (order: OrderEntity) => order.id)
  order: OrderEntity[];
}
