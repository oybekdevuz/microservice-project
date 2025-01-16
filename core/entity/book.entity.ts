
import {Column, Entity, Index, JoinColumn, ManyToOne } from "typeorm";
import { BaseEntity } from '@app/common';
import { UserEntity } from "./user.entity";

@Entity('books')
export class BookEntity extends BaseEntity {
  @Column({type: 'varchar'})
  public name!: string;
  
  @Column({type: 'varchar'})
  public description!: string;

  @Column({type: 'boolean', default: false})
  public isSale!: boolean;

  @ManyToOne(() => UserEntity, (user) => user.books)
  @JoinColumn({ name: "user_id" })
  user!: UserEntity;


}
