import { ApiProperty } from '@nestjs/swagger';
import { UserEntity } from 'src/user/entities/user.entity';
import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from 'typeorm';
import { IsNotEmpty, IsNumber } from 'class-validator';

@Entity()
export class RoleEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  @IsNotEmpty()
  @ApiProperty({ type: String })
  name: string;

  @Column()
  @ApiProperty({ type: String })
  desc: string;

  @IsNotEmpty()
  @IsNumber()
  @ApiProperty({ type: Number })
  @OneToMany(() => UserEntity, (user: UserEntity) => user.id)
  user: UserEntity[];
}
