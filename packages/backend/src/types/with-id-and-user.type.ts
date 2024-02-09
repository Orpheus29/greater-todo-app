import { BaseEntity } from 'typeorm';
import { User } from '../entities/user.entity';

class WithIdandUser extends BaseEntity {
  id: string;

  user?: User;
}

export type BaseEntityWithIdAndUser = typeof WithIdandUser;
