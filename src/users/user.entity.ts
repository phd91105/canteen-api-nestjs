import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
export class UserEntity {
  @PrimaryGeneratedColumn()
  public id: number;

  @Column('text')
  public email: string;

  @Column({ length: 50 })
  public fullName: string;

  @Column('text')
  public username: string;

  @Column('text')
  public password: string;
}
