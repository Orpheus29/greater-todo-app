import { BaseEntity, Column, Entity, ManyToOne, PrimaryGeneratedColumn } from 'typeorm';
import { ITodo } from '../types/todo.type';
import { User } from './user.entity';

@Entity()
export class Todo extends BaseEntity implements ITodo {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column()
  title: string;

  @Column()
  description: string;

  @Column()
  done: boolean = false;

  @Column()
  isPrivate: boolean = true;

  @ManyToOne(() => User, { onDelete: 'CASCADE' })
  user?: User;
}
