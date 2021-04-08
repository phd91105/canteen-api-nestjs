import { ApiProperty } from '@nestjs/swagger';
import { User } from 'src/user/user.entity';
import { Column, Entity, OneToOne, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
export class Role {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ length: 500 })
  @ApiProperty({ type: String, description: 'email' })
  name: string;

  @Column('text')
  @ApiProperty({ type: String, description: 'email' })
  description: string;

  @OneToOne(() => User, (user: User) => user.role)
  public user: User;
}
