import {
  Column,
  Entity,
  JoinColumn,
  OneToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { IsEmail, IsNotEmpty, IsString } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';
import { Role } from '../role/role.entity';

@Entity()
export class User {
  @PrimaryGeneratedColumn()
  public id: number;

  @IsString()
  @IsEmail()
  @IsNotEmpty()
  @ApiProperty({ type: String })
  @Column()
  public email: string;

  @IsString()
  @IsNotEmpty()
  @ApiProperty({ type: String })
  @Column({ length: 50 })
  public fullName: string;

  @IsString()
  @IsNotEmpty()
  @ApiProperty({ type: String })
  @Column()
  public username: string;

  @IsString()
  @IsNotEmpty()
  @ApiProperty({ type: String })
  @Column()
  public password: string;

  @IsNotEmpty()
  @ApiProperty({ type: Number })
  @OneToOne(() => Role, {
    eager: true,
    cascade: true,
  })
  @JoinColumn()
  public role: Role;
}
