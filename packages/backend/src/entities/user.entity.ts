import { BaseEntity, Column, Entity, Generated, PrimaryGeneratedColumn } from 'typeorm';
import { IUser } from '../types/user.types';

@Entity()
export class User extends BaseEntity implements IUser {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({ unique: true })
  email: string;

  @Column()
  password: string;

  @Generated('uuid')
  @Column()
  resetId: string;
}
