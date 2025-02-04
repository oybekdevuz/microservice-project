
import {Column, Entity, Index, OneToMany } from "typeorm";
import { BaseEntity } from '@app/common';
import { BookEntity } from "./book.entity";

@Entity('users')
export class UserEntity extends BaseEntity {
  @Column({type: 'varchar', length: 64})
  public fullname!: string;

  @Index({unique: true})
  @Column({type: 'varchar', length: 20})
  public username!: string;

  @Column({type: 'varchar'})
  public password!: string;

  @OneToMany(() => BookEntity, (book) => book.user)
  books!: BookEntity[];
}
