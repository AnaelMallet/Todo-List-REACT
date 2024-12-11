import {
  BaseEntity,
  Column, 
  CreateDateColumn,
  Entity,
  OneToMany,
  PrimaryColumn,
  UpdateDateColumn
} from "typeorm"

import ListEntity from "src/domains/lists/infra/databases/entities/list"

@Entity({ name: "users" })
export default class UserEntity extends BaseEntity {
  @PrimaryColumn()
  uuid: string

  @Column('varchar', { length: 64 })
  firstrname: string

  @Column('varchar', { length: 64 })
  lastname: string

  @Column("varchar", { length: 64 })
  email: string

  @Column("varchar", { length : 32, nullable: true })
  username: string

  @Column("varchar", { length: 64 })
  password: string

  @Column("text", { nullable: true })
  accessToken: string

  @Column("text", { nullable: true })
  refreshToken: string

  @OneToMany(() => ListEntity, list => list.user)
  lists: ListEntity[]

  @CreateDateColumn()
  createdDate: Date

  @UpdateDateColumn()
  updatedDate: Date
}