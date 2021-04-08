import {
  Column,
  Entity,
  JoinColumn,
  OneToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { IsString } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';
import { Role } from 'src/role/role.entity';

@Entity()
export class User {
  @PrimaryGeneratedColumn()
  public id: number;
  @IsString()
  @ApiProperty({ type: String, description: 'email' })
  @Column('text')
  public email: string;
  @IsString()
  @ApiProperty({ type: String, description: 'fullname' })
  @Column({ length: 50 })
  public fullName: string;
  @IsString()
  @ApiProperty({ type: String, description: 'username' })
  @Column('text')
  public username: string;
  @IsString()
  @ApiProperty({ type: String, description: 'password' })
  @Column('text')
  public password: string;
  @ApiProperty({ type: Number, description: 'roleId' })
  @OneToOne(() => Role, {
    eager: true,
    cascade: true,
  })
  @JoinColumn()
  public role: Role;
}
