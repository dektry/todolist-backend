import { Entity, Column } from 'typeorm';
import { BaseModelEntity } from './base.entity';

@Entity('todo')
export class ToDoList extends BaseModelEntity {
  @Column({ length: 255, nullable: false })
  content: string;

  @Column({ default: false })
  isCompleted: boolean;
}
