import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
export class UserEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column('text')
  email: string;

  @Column({ length: 500 })
  fullName: string;

  @Column('text')
  username: string;

  @Column('text')
  password: string;
}
