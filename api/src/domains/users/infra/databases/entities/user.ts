import {
  BaseEntity,
  Column, 
  CreateDateColumn,
  Entity,
  PrimaryColumn,
  UpdateDateColumn
} from "typeorm"

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

  @CreateDateColumn()
  createdDate: Date

  @UpdateDateColumn()
  updatedDate: Date
}