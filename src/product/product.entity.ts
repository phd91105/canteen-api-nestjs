import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsNumberString, IsString } from 'class-validator';
import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
export class Product {
  @PrimaryGeneratedColumn()
  public id: number;

  @IsNotEmpty()
  @IsString()
  @ApiProperty({ type: String })
  @Column()
  public name: string;

  @IsString()
  @ApiProperty({ type: String })
  @Column()
  public desc: string;

  @IsString()
  @ApiProperty({ type: String })
  @Column()
  public details: string;

  @IsNotEmpty()
  @IsNumberString()
  @ApiProperty({ type: Number })
  @Column()
  public price: number;

  @IsNumberString()
  @ApiProperty({ type: Number })
  @Column()
  public stock: number;

  @IsNumberString()
  @ApiProperty({ type: Number })
  @Column()
  public viewCount: number;
}
