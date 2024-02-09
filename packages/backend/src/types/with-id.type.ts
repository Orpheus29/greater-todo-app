import { BaseEntity } from 'typeorm';

class WithId extends BaseEntity {
  id: string;
}

export type BaseEntityWithId = typeof WithId;
