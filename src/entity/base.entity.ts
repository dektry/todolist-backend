import { PrimaryGeneratedColumn, CreateDateColumn, UpdateDateColumn } from 'typeorm';

export class BaseEntity {
  @PrimaryGeneratedColumn()
  id: number;
}

export class BaseModelEntity extends BaseEntity {
  @CreateDateColumn()
  created: Date;

  @UpdateDateColumn()
  updated: Date;
}
